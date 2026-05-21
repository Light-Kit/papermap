"""Markdown blog loader for papermap.

Blogs live in ``<corpus_dir>/blogs/<corpus_stem>/*.md`` with a small
YAML frontmatter block describing the post. The Flask app turns each
file into a dict the SPA can render; topics carried in frontmatter use
the same vocab the resourcelib corpus uses, so the Topics view can
surface "N blogs on this topic" without any extra schema work.
"""

from __future__ import annotations

import logging
import posixpath
import re
from dataclasses import dataclass, replace
from pathlib import Path
from typing import Any

import markdown
import yaml

_LOG = logging.getLogger(__name__)
_MD_EXTENSIONS = ["extra", "sane_lists", "toc"]

# Bodies authored against the mkdocs site reference plotly assets as
# `assets/<file>.html` and reference sibling pages as `<slug>.md`. The
# loader rewrites both so the SPA can resolve them: iframes get an
# absolute asset URL, and intra-corpus links get a sentinel scheme the
# blogs.js click handler intercepts to open the matching blog inline.
_IFRAME_SRC_RE = re.compile(r'(<iframe\b[^>]*\bsrc=")(?:\.\./)*assets/([^"]+)(")', re.I)
_MD_LINK_RE = re.compile(r'(<a\b[^>]*\bhref=")(?!https?:|/|#)([^"#]+)\.md(#[^"]*)?(")', re.I)


@dataclass(frozen=True)
class Blog:
    """One rendered blog post.

    Carried as a dataclass (not a raw dict) so the loader can be reused
    from CLI / tests without re-deriving the same fields each time.
    """
    slug: str
    title: str
    date: str
    topics: tuple[str, ...]
    summary: str
    body_html: str
    source: str
    starred: bool = False
    # Chinese translation, attached from a sibling ``<slug>.zh.md`` file
    # when present. Empty strings mean "no translation" — the frontend
    # language toggle falls back to the English fields.
    title_zh: str = ""
    summary_zh: str = ""
    body_html_zh: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "slug": self.slug,
            "title": self.title,
            "date": self.date,
            "topics": list(self.topics),
            "summary": self.summary,
            "body_html": self.body_html,
            "source": self.source,
            "starred": self.starred,
            "title_zh": self.title_zh,
            "summary_zh": self.summary_zh,
            "body_html_zh": self.body_html_zh,
        }


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Split ``---\\n...\\n---\\n`` frontmatter from a markdown file.

    Returns ``({}, text)`` if no frontmatter is present so callers can
    treat frontmatter as optional during early authoring.
    """
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end == -1:
        return {}, text
    front_raw = text[4:end]
    body = text[end + 5 :]
    data = yaml.safe_load(front_raw) or {}
    if not isinstance(data, dict):
        return {}, text
    return data, body


def _rewrite_html(
    html: str,
    *,
    asset_url_prefix: str,
    known_slugs: set[str],
    external_docs_base: str = "",
    source_subpath: str = "",
) -> str:
    """Rewrite iframe asset srcs + relative .md hrefs in rendered body_html.

    Iframe ``src="assets/foo.html"`` becomes the absolute Flask URL the
    server is set up to serve. Relative ``.md`` hrefs split two ways:
    if the basename matches another blog in the corpus, the link becomes
    ``papermap-blog:<slug>`` (intercepted by blogs.js); otherwise — when
    ``external_docs_base`` is set — the link is resolved against
    ``source_subpath`` (the dir the blog markdown was authored to live
    in on the MkDocs site) and rewritten to ``{base}/{resolved}/`` so
    ``../foo.md`` from a blog whose source lives at ``talks/<x>/`` ends
    up at ``{base}/talks/foo/`` instead of a stripped-prefix 404.
    """
    if asset_url_prefix:
        html = _IFRAME_SRC_RE.sub(rf'\1{asset_url_prefix}\2\3', html)

    def link_sub(m: re.Match) -> str:
        prefix, target, anchor, suffix = m.group(1), m.group(2), m.group(3) or "", m.group(4)
        slug = target.rsplit("/", 1)[-1]
        if slug in known_slugs:
            return f'{prefix}papermap-blog:{slug}{anchor}{suffix}'
        if external_docs_base:
            base = external_docs_base.rstrip("/")
            if source_subpath:
                resolved = posixpath.normpath(posixpath.join(source_subpath, target))
                # A leading `..` means the target escaped the docs root —
                # leave the link untouched rather than emit a broken URL.
                if resolved.startswith(".."):
                    return m.group(0)
                return f'{prefix}{base}/{resolved}/{anchor}{suffix}'
            clean = target.lstrip("./").lstrip("../")
            return f'{prefix}{base}/{clean}/{anchor}{suffix}'
        return m.group(0)

    return _MD_LINK_RE.sub(link_sub, html)


def load_blog(path: Path) -> Blog:
    text = path.read_text(encoding="utf-8")
    front, body = parse_frontmatter(text)
    html = markdown.markdown(body, extensions=_MD_EXTENSIONS, output_format="html5")
    topics = front.get("topics") or []
    if isinstance(topics, str):
        topics = [topics]
    return Blog(
        slug=path.stem,
        title=str(front.get("title") or path.stem.replace("-", " ").title()),
        date=str(front.get("date") or ""),
        topics=tuple(str(t) for t in topics),
        summary=str(front.get("summary") or ""),
        body_html=html,
        source=str(front.get("source") or ""),
        starred=bool(front.get("starred", False)),
    )


def list_blogs(
    blogs_dir: Path,
    *,
    asset_url_prefix: str = "",
    external_docs_base: str = "",
    source_subpath: str = "",
) -> list[Blog]:
    """Return blogs in ``blogs_dir`` sorted by date desc, then add-time desc.

    Within a single date the most recently added/edited file wins, so the
    newest post stays on top even when a whole essay arc shares one date.

    A missing directory returns an empty list so corpora without blogs
    stay valid — the Blogs tab just renders an empty-state.

    When ``asset_url_prefix`` is set, iframe asset srcs in rendered
    body_html are rewritten to that prefix (the server passes its own
    ``/api/blogs/<corpus>/assets/`` URL); cross-blog .md links are
    rewritten to ``papermap-blog:<slug>`` for the SPA to intercept.
    """
    if not blogs_dir.is_dir():
        return []
    loaded: list[tuple[float, Blog]] = []
    # Chinese translations live in sibling ``<slug>.zh.md`` files; they are
    # not blogs of their own — they are folded into the English base blog.
    translations: dict[str, Blog] = {}
    for path in sorted(blogs_dir.iterdir()):
        if path.suffix.lower() != ".md" or not path.is_file():
            continue
        # Skip-and-log instead of abort-the-corpus: one broken
        # frontmatter shouldn't take the whole Blogs tab to 500.
        if path.name.lower().endswith(".zh.md"):
            base_slug = path.name[: -len(".zh.md")]
            try:
                translations[base_slug] = load_blog(path)
            except Exception as exc:
                _LOG.warning("blog translation load failed for %s: %s", path.name, exc)
            continue
        try:
            loaded.append((path.stat().st_mtime, load_blog(path)))
        except Exception as exc:
            _LOG.warning("blog load failed for %s: %s", path.name, exc)
    # Date is primary; file mtime breaks ties so the newest-added post
    # leads its date group instead of sorting by title alphabetically.
    loaded.sort(key=lambda mb: (mb[1].date or "", mb[0]), reverse=True)
    out: list[Blog] = []
    for _, b in loaded:
        tr = translations.get(b.slug)
        if tr:
            b = replace(
                b,
                title_zh=tr.title,
                summary_zh=tr.summary,
                body_html_zh=tr.body_html,
            )
        out.append(b)
    if asset_url_prefix or external_docs_base:
        slugs = {b.slug for b in out}

        def rewrite(html: str) -> str:
            return _rewrite_html(
                html,
                asset_url_prefix=asset_url_prefix,
                known_slugs=slugs,
                external_docs_base=external_docs_base,
                source_subpath=source_subpath,
            )

        out = [
            replace(
                b,
                body_html=rewrite(b.body_html),
                body_html_zh=rewrite(b.body_html_zh) if b.body_html_zh else "",
            )
            for b in out
        ]
    return out
