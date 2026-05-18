"""Audit every link inside the rendered blog corpus.

Phases:
  --structural   : page-exists + anchor-exists for intra-blog / MkDocs / conf-vaults
                   refs; curl probes for external_misc.
  --inventory    : dump unique URLs grouped by class to JSON for the live-browser
                   phase (Chrome DevTools driven separately).

Run after starting the local server (port 5099). Reads the *rewritten* HTML the
SPA actually serves so rewriter bugs surface alongside source bugs.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
import urllib.error
import urllib.request
from collections import defaultdict
from pathlib import Path
from typing import Iterable

REPO = Path(__file__).resolve().parent.parent
BLOG_DIR = REPO / "examples" / "blogs" / "fm-to-virtual-cells-resourcelib"
FMVC_DOCS = Path("/Users/lzhang34/Desktop/fm-to-virtual-cells/docs")
VAULTS_DOCS = Path("/Users/lzhang34/Desktop/conference-vaults/docs")
API_URL = "http://127.0.0.1:5099/api/blogs/fm-to-virtual-cells-resourcelib.yaml"

FMVC_BASE = "https://liudengzhang.github.io/fm-to-virtual-cells/"
VAULTS_BASE = "https://liudengzhang.github.io/conference-vaults/"
PAPER_HOSTS = (
    "doi.org", "biorxiv.org", "nature.com", "cell.com", "science.org",
    "pubmed.ncbi.nlm.nih.gov", "pmc.ncbi.nlm.nih.gov", "icml.cc", "iclr.cc",
    "openreview.net", "arxiv.org", "advanced.onlinelibrary.wiley.com",
)

LINK_RE = re.compile(r'<a\b[^>]*\bhref="([^"]+)"[^>]*>(.*?)</a>', re.I | re.S)
TAG_STRIP = re.compile(r"<[^>]+>")


def fetch_blogs() -> list[dict]:
    with urllib.request.urlopen(API_URL, timeout=10) as r:
        return json.load(r)


def slugify_mkdocs(text: str) -> str:
    """Replicate the slug rule MkDocs Material's TOC plugin uses by default.

    Matches Python-Markdown's `toc.slugify_unicode` w/ ASCII fallback:
    NFKD-normalise, lowercase, strip non-word chars except `-`, collapse `-`.
    Empirically: superscript `²` → empty (catches the gen2-workshop bug).
    """
    s = unicodedata.normalize("NFKD", text)
    s = s.encode("ascii", "ignore").decode("ascii")
    s = s.lower()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s).strip("-")
    s = re.sub(r"-{2,}", "-", s)
    return s


def headings_for(md_path: Path) -> set[str]:
    if not md_path.is_file():
        return set()
    text = md_path.read_text(encoding="utf-8")
    out: set[str] = set()
    # Skip fenced-code regions to avoid `# comment` lines becoming false anchors.
    in_fence = False
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        m = re.match(r"^(#{1,6})\s+(.+?)\s*#*\s*$", line)
        if m:
            out.add(slugify_mkdocs(m.group(2)))
    return out


def classify(href: str, known_slugs: set[str]) -> str:
    if href.startswith("papermap-blog:"):
        return "intra_blog"
    if href.startswith(FMVC_BASE):
        return "mkdocs_fmvc"
    if href.startswith(VAULTS_BASE):
        return "conference_vaults"
    if not href.startswith(("http://", "https://")):
        return "other"
    host = href.split("/", 3)[2].lower()
    if any(host == h or host.endswith("." + h) or h in host for h in PAPER_HOSTS):
        return "external_paper"
    return "external_misc"


def md_url_to_source(href: str, docs_root: Path) -> tuple[Path, str]:
    """Map a MkDocs page URL → (source .md path, anchor without `#`)."""
    base = FMVC_BASE if str(docs_root).endswith("fm-to-virtual-cells/docs") else VAULTS_BASE
    rest = href[len(base):]
    anchor = ""
    if "#" in rest:
        rest, anchor = rest.split("#", 1)
    rest = rest.rstrip("/")
    if not rest:
        candidate = docs_root / "index.md"
    else:
        candidate = docs_root / f"{rest}.md"
        if not candidate.is_file():
            candidate = docs_root / rest / "index.md"
    return candidate, anchor


def probe_misc(url: str) -> int | str:
    try:
        req = urllib.request.Request(
            url, method="HEAD",
            headers={"User-Agent": "Mozilla/5.0 (audit) AppleWebKit"},
        )
        with urllib.request.urlopen(req, timeout=12) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:
        return f"ERR:{type(e).__name__}"


def find_source_lines(href: str, link_text: str) -> list[tuple[str, int]]:
    """Find (blog_filename, 1-based line number) for occurrences of this href.

    Walks the raw .md files since the rewriter mangles MkDocs URLs at render
    time; we want to surface the *authored* form.
    """
    out: list[tuple[str, int]] = []
    # Reverse the rewriter for FMVC URLs so we can find the authored `../foo.md`.
    candidates = [href]
    if href.startswith(FMVC_BASE):
        # Try a few authored forms; line search will match whichever exists.
        rest = href[len(FMVC_BASE):].rstrip("/")
        if "#" in rest:
            rest, anc = rest.split("#", 1)
            anc = f"#{anc}"
        else:
            anc = ""
        # `talks/foo` → authored as `../foo.md` from a blog at talks/<corpus>/
        if rest.startswith("talks/"):
            sub = rest[len("talks/"):]
            candidates += [f"../{sub}.md{anc}", f"{sub}.md{anc}"]
        else:
            candidates += [f"../../{rest}.md{anc}"]
    for md in sorted(BLOG_DIR.glob("*.md")):
        lines = md.read_text(encoding="utf-8").splitlines()
        for i, line in enumerate(lines, start=1):
            if any(c in line for c in candidates):
                out.append((md.name, i))
                break
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--structural", action="store_true")
    ap.add_argument("--inventory", action="store_true")
    ap.add_argument("--out", default="/tmp/blog-link-audit.json")
    args = ap.parse_args()

    posts = fetch_blogs()
    known_slugs = {p["slug"] for p in posts}

    # Cache MkDocs heading sets.
    heading_cache: dict[Path, set[str]] = {}

    by_class: dict[str, list[dict]] = defaultdict(list)
    seen: dict[tuple[str, str], dict] = {}

    for post in posts:
        for m in LINK_RE.finditer(post["body_html"]):
            href = m.group(1)
            text = TAG_STRIP.sub("", m.group(2)).strip()
            key = (post["slug"], href)
            if key in seen:
                continue
            cls = classify(href, known_slugs)
            row = {
                "blog": post["slug"],
                "link_text": text,
                "href": href,
                "class": cls,
                "status": "pending",
                "evidence": "",
            }

            if cls == "intra_blog":
                slug = href[len("papermap-blog:"):].split("#")[0]
                if slug in known_slugs:
                    row["status"] = "ok"
                else:
                    row["status"] = "broken"
                    row["evidence"] = f"unknown blog slug {slug!r}"
            elif cls == "mkdocs_fmvc":
                src, anchor = md_url_to_source(href, FMVC_DOCS)
                if not src.is_file():
                    row["status"] = "broken"
                    row["evidence"] = f"no source .md at {src.relative_to(FMVC_DOCS)}"
                elif anchor:
                    if src not in heading_cache:
                        heading_cache[src] = headings_for(src)
                    if anchor not in heading_cache[src]:
                        row["status"] = "broken-anchor"
                        # Suggest closest by longest-shared-prefix length.
                        closest = sorted(
                            heading_cache[src],
                            key=lambda s: -len(_lcp(s, anchor)),
                        )[:3]
                        row["evidence"] = f"anchor not in {src.name}; closest: {closest}"
                    else:
                        row["status"] = "ok"
                else:
                    row["status"] = "ok"
            elif cls == "conference_vaults":
                src, _ = md_url_to_source(href, VAULTS_DOCS)
                if src.is_file():
                    row["status"] = "ok"
                else:
                    row["status"] = "broken"
                    row["evidence"] = f"no source .md at {src.relative_to(VAULTS_DOCS)}"
            elif cls == "external_misc":
                code = probe_misc(href)
                row["status"] = "ok" if code == 200 else f"http_{code}"
            elif cls == "external_paper":
                # Defer to live-browser phase; just mark.
                row["status"] = "needs-browser"
            else:
                row["status"] = "other"

            row["lines"] = find_source_lines(href, text)
            by_class[cls].append(row)
            seen[key] = row

    # Summary
    print(f"\n=== Audit summary ({sum(len(v) for v in by_class.values())} unique links) ===")
    for cls, rows in sorted(by_class.items()):
        counts: dict[str, int] = defaultdict(int)
        for r in rows:
            counts[r["status"]] += 1
        bits = ", ".join(f"{k}={v}" for k, v in sorted(counts.items()))
        print(f"  {cls:18s}  total={len(rows):3d}  {bits}")

    # Print every non-ok / non-needs-browser row.
    print("\n=== Non-ok rows ===")
    bad_total = 0
    for cls, rows in sorted(by_class.items()):
        bad = [r for r in rows if r["status"] not in ("ok", "needs-browser")]
        if not bad:
            continue
        print(f"\n--- {cls} ({len(bad)}) ---")
        for r in bad:
            lines = ", ".join(f"{f}:{n}" for f, n in r["lines"]) or "?"
            print(f"  [{r['status']}] {lines}")
            print(f"    text: {r['link_text'][:80]}")
            print(f"    href: {r['href']}")
            if r["evidence"]:
                print(f"    why : {r['evidence']}")
        bad_total += len(bad)

    Path(args.out).write_text(json.dumps(by_class, indent=2, default=str))
    print(f"\nFull report → {args.out}  ({bad_total} non-ok rows excluding needs-browser)")
    return 0


def _lcp(a: str, b: str) -> str:
    n = min(len(a), len(b))
    i = 0
    while i < n and a[i] == b[i]:
        i += 1
    return a[:i]


if __name__ == "__main__":
    sys.exit(main())
