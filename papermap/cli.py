"""Command-line interface — ``papermap build CORPUS [-o OUT]``."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from .export import export_static
from .render import RenderConfig, build_figure, write_html
from .schema import CorpusError, lint_corpus, load_corpus


def _build(args: argparse.Namespace) -> int:
    try:
        corpus = load_corpus(args.corpus)
    except CorpusError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    out = Path(args.output) if args.output else Path(args.corpus).with_suffix(".html")
    render = RenderConfig()
    if args.height:
        render.height = args.height
    fig = build_figure(corpus, render)
    write_html(fig, str(out))
    print(
        f"wrote {out}  "
        f"({len(corpus.papers)} papers, {len(corpus.edges)} edges, "
        f"{len(corpus.categories)} categories)"
    )
    return 0


def _check(args: argparse.Namespace) -> int:
    try:
        corpus = load_corpus(args.corpus)
    except CorpusError as exc:
        print(f"invalid: {exc}", file=sys.stderr)
        return 1
    print(
        f"ok: {args.corpus}  "
        f"({len(corpus.papers)} papers, {len(corpus.edges)} edges, "
        f"{len(corpus.categories)} categories, {len(corpus.relations)} relations)"
    )
    for warning in lint_corpus(corpus):
        print(f"  warning: {warning}", file=sys.stderr)
    return 0


def _export(args: argparse.Namespace) -> int:
    try:
        out = export_static(args.corpus, args.output)
    except Exception as exc:  # noqa: BLE001 — surface every reason as one
        print(f"error: {exc}", file=sys.stderr)
        return 1
    print(f"exported static site to {out}")
    return 0


def _serve(args: argparse.Namespace) -> int:
    from .server import create_app

    corpus_dir = Path(args.directory).resolve()
    if not corpus_dir.is_dir():
        print(f"error: {corpus_dir} is not a directory", file=sys.stderr)
        return 1

    app = create_app(corpus_dir)
    url = f"http://{args.host}:{args.port}/"
    print(f"papermap serving {corpus_dir} at {url}")

    if not args.no_browser:
        import threading
        import webbrowser

        threading.Timer(0.8, lambda: webbrowser.open(url)).start()

    app.run(host=args.host, port=args.port, debug=False)
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="papermap",
        description="Turn a corpus YAML file into an interactive paper-relationship map.",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_build = sub.add_parser("build", help="render a corpus to an interactive HTML map")
    p_build.add_argument("corpus", help="path to the corpus YAML file")
    p_build.add_argument("-o", "--output", help="output HTML path (default: alongside the corpus)")
    p_build.add_argument("--height", type=int, help="figure height in pixels (default: 780)")
    p_build.set_defaults(func=_build)

    p_check = sub.add_parser("check", help="validate a corpus file without rendering")
    p_check.add_argument("corpus", help="path to the corpus YAML file")
    p_check.set_defaults(func=_check)

    p_export = sub.add_parser("export", help="export a corpus as a static site")
    p_export.add_argument("corpus", help="path to the corpus YAML file")
    p_export.add_argument("-o", "--output", default="site",
                          help="output directory (default: ./site)")
    p_export.set_defaults(func=_export)

    p_serve = sub.add_parser("serve", help="run a local web server for a directory of corpora")
    p_serve.add_argument("directory", nargs="?", default=".",
                         help="directory to scan for *.yaml corpora (default: cwd)")
    p_serve.add_argument("--host", default="127.0.0.1", help="bind host (default: 127.0.0.1)")
    p_serve.add_argument("--port", type=int, default=8000, help="bind port (default: 8000)")
    p_serve.add_argument("--no-browser", action="store_true", help="don't auto-open the browser")
    p_serve.set_defaults(func=_serve)

    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
