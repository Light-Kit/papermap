"""Markdown blog loader for papermap.

Blogs live in ``<corpus_dir>/blogs/<corpus_stem>/*.md`` with a small
YAML frontmatter block describing the post. The Flask app turns each
file into a dict the SPA can render; topics carried in frontmatter use
the same vocab the resourcelib corpus uses, so the Topics view can
surface "N blogs on this topic" without any extra schema work.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import markdown
import yaml

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

    def to_dict(self) -> dict[str, Any]:
        return {
            "slug": self.slug,
            "title": self.title,
            "date": self.date,
            "topics": list(self.topics),
            "summary": self.summary,
            "body_html": self.body_html,
            "source": self.source,
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
) -> str:
    """Rewrite iframe asset srcs + relative .md hrefs in rendered body_html.

    Iframe ``src="assets/foo.html"`` becomes the absolute Flask URL the
    server is set up to serve. Relative ``.md`` hrefs split two ways:
    if the basename matches another blog in the corpus, the link becomes
    ``papermap-blog:<slug>`` (intercepted by blogs.js); otherwise — when
    ``external_docs_base`` is set — the link is rewritten to that base
    using MkDocs' ``foo.md`` → ``foo/`` convention so it opens the live
    talk site instead of 404ing inside papermap.
    """
    if asset_url_prefix:
        html = _IFRAME_SRC_RE.sub(rf'\1{asset_url_prefix}\2\3', html)

    def link_sub(m: re.Match) -> str:
        prefix, target, anchor, suffix = m.group(1), m.group(2), m.group(3) or "", m.group(4)
        slug = target.rsplit("/", 1)[-1]
        if slug in known_slugs:
            return f'{prefix}papermap-blog:{slug}{anchor}{suffix}'
        if external_docs_base:
            # MkDocs renders `foo.md` to `foo/`. Strip any leading `../`
            # so the path joins cleanly onto the base.
            clean = target.lstrip("./").lstrip("../")
            base = external_docs_base.rstrip("/")
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
    )


def list_blogs(
    blogs_dir: Path,
    *,
    asset_url_prefix: str = "",
    external_docs_base: str = "",
) -> list[Blog]:
    """Return blogs in ``blogs_dir`` sorted by date desc, then title.

    A missing directory returns an empty list so corpora without blogs
    stay valid — the Blogs tab just renders an empty-state.

    When ``asset_url_prefix`` is set, iframe asset srcs in rendered
    body_html are rewritten to that prefix (the server passes its own
    ``/api/blogs/<corpus>/assets/`` URL); cross-blog .md links are
    rewritten to ``papermap-blog:<slug>`` for the SPA to intercept.
    """
    if not blogs_dir.is_dir():
        return []
    out: list[Blog] = []
    for path in sorted(blogs_dir.iterdir()):
        if path.suffix.lower() == ".md" and path.is_file():
            out.append(load_blog(path))
    out.sort(key=lambda b: (b.date or "", b.title), reverse=True)
    if asset_url_prefix or external_docs_base:
        slugs = {b.slug for b in out}
        out = [
            Blog(
                slug=b.slug, title=b.title, date=b.date, topics=b.topics,
                summary=b.summary, source=b.source,
                body_html=_rewrite_html(
                    b.body_html,
                    asset_url_prefix=asset_url_prefix,
                    known_slugs=slugs,
                    external_docs_base=external_docs_base,
                ),
            )
            for b in out
        ]
    return out
