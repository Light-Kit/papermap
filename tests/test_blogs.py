"""Blog loader: frontmatter parsing + markdown rendering."""

from __future__ import annotations

from pathlib import Path

from papermap.blogs import list_blogs, load_blog, parse_frontmatter


def test_parse_frontmatter_splits_yaml_block():
    text = "---\ntitle: hi\ntopics: [a, b]\n---\nbody **bold**\n"
    front, body = parse_frontmatter(text)
    assert front == {"title": "hi", "topics": ["a", "b"]}
    assert body == "body **bold**\n"


def test_parse_frontmatter_returns_empty_when_missing():
    text = "# Just a title\n\nbody\n"
    front, body = parse_frontmatter(text)
    assert front == {}
    assert body == text


def test_load_blog_renders_markdown(tmp_path: Path):
    p = tmp_path / "post.md"
    p.write_text(
        "---\n"
        "title: First post\n"
        "date: 2026-05-15\n"
        "topics: [foundation-model, eval]\n"
        "summary: Short summary\n"
        "---\n"
        "# Heading\n\nA **bold** word.\n"
    )
    blog = load_blog(p)
    assert blog.slug == "post"
    assert blog.title == "First post"
    assert blog.date == "2026-05-15"
    assert blog.topics == ("foundation-model", "eval")
    assert blog.summary == "Short summary"
    assert "<strong>bold</strong>" in blog.body_html
    assert "<h1" in blog.body_html and "Heading</h1>" in blog.body_html


def test_list_blogs_sorts_by_date_desc(tmp_path: Path):
    (tmp_path / "a.md").write_text("---\ntitle: A\ndate: 2026-01-01\n---\nA\n")
    (tmp_path / "b.md").write_text("---\ntitle: B\ndate: 2026-06-01\n---\nB\n")
    (tmp_path / "c.md").write_text("---\ntitle: C\ndate: 2026-03-01\n---\nC\n")
    blogs = list_blogs(tmp_path)
    assert [b.slug for b in blogs] == ["b", "c", "a"]


def test_list_blogs_same_date_breaks_ties_by_mtime_desc(tmp_path: Path):
    """A whole essay arc shares one date — newest-added must lead the group."""
    import os

    (tmp_path / "older.md").write_text("---\ntitle: Zeta\ndate: 2026-05-19\n---\nx\n")
    (tmp_path / "newer.md").write_text("---\ntitle: Alpha\ndate: 2026-05-19\n---\nx\n")
    # Force mtimes: older file earlier, newer file later. Title order alone
    # (reverse-alpha) would put Zeta first; mtime must override that.
    os.utime(tmp_path / "older.md", (1_000_000, 1_000_000))
    os.utime(tmp_path / "newer.md", (2_000_000, 2_000_000))
    blogs = list_blogs(tmp_path)
    assert [b.slug for b in blogs] == ["newer", "older"]


def test_list_blogs_missing_dir_returns_empty(tmp_path: Path):
    assert list_blogs(tmp_path / "nope") == []


def test_list_blogs_skips_broken_frontmatter_instead_of_aborting(tmp_path: Path, caplog):
    """One unparsable file must not blank out the whole corpus.

    Regression for the YAML colon-space crash: a stray `key: value` inside
    an unquoted summary raised ScannerError, list_blogs aborted, and the
    Flask endpoint 500'd — taking every blog with it.
    """
    (tmp_path / "good.md").write_text(
        "---\ntitle: Good\ndate: 2026-05-18\n---\nbody\n"
    )
    # Unquoted ": " inside the summary scalar trips YAML's mapping parser.
    (tmp_path / "broken.md").write_text(
        "---\ntitle: Broken\ndate: 2026-05-18\n"
        "summary: oops here is a colon: inside an unquoted scalar\n"
        "---\nbody\n"
    )
    import logging
    with caplog.at_level(logging.WARNING, logger="papermap.blogs"):
        blogs = list_blogs(tmp_path)
    assert [b.slug for b in blogs] == ["good"]
    assert any("broken.md" in r.message for r in caplog.records)


def test_load_blog_without_frontmatter_falls_back_to_slug_title(tmp_path: Path):
    p = tmp_path / "no-frontmatter-here.md"
    p.write_text("Just a body.\n")
    blog = load_blog(p)
    assert blog.title == "No Frontmatter Here"
    assert blog.topics == ()
    assert blog.body_html.startswith("<p>")


def test_list_blogs_rewrites_iframe_assets_and_internal_links(tmp_path: Path):
    """Two posts that cross-link + an iframe — exercise both rewrites."""
    (tmp_path / "a.md").write_text(
        "---\ntitle: A\ndate: 2026-01-02\n---\n"
        "See [B](b.md#section) and [supplementary](supp.md#x).\n\n"
        '<iframe src="assets/fig.html"></iframe>\n'
    )
    (tmp_path / "b.md").write_text(
        "---\ntitle: B\ndate: 2026-01-01\n---\nbody B\n"
    )
    blogs = list_blogs(
        tmp_path,
        asset_url_prefix="/api/blogs/x.yaml/assets/",
        external_docs_base="https://example.org/docs",
    )
    by_slug = {b.slug: b for b in blogs}
    a_html = by_slug["a"].body_html
    # Cross-blog link rewritten to the sentinel scheme blogs.js intercepts.
    assert 'href="papermap-blog:b#section"' in a_html
    # Mkdocs-only link (no matching slug) goes to the external docs base.
    assert 'href="https://example.org/docs/supp/#x"' in a_html
    # Iframe asset src is absolute under the per-corpus assets endpoint.
    assert 'src="/api/blogs/x.yaml/assets/fig.html"' in a_html
    # Without rewrite, the body remains relative.
    raw = list_blogs(tmp_path)
    assert 'src="assets/fig.html"' in by_slug_raw_html(raw, "a")
    assert 'href="b.md#section"' in by_slug_raw_html(raw, "a")


def by_slug_raw_html(blogs, slug):
    return next(b.body_html for b in blogs if b.slug == slug)
