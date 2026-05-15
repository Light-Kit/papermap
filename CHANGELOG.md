# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.3.0] — 2026-05-15

### Added
- Six-view local web app: Stats, Browse, Map, Table, Topics & People, Timeline.
- Filters (kind, topic, status, org_type, region, free-text) on Browse, Map, Table.
- `/api/state/<name>` endpoint — returns the parsed corpus as JSON.
- `/healthz` endpoint for hosting health probes.
- Silent auto-detection of resourcelib YAML (`vocab:` + `items:`).
- `papermap.loaders.load_corpus` as the canonical loader entry point.
- `Item` dataclass — unified record consumed by all views.
- `papermap export` subcommand — static-site emitter.
- `docs/deploy/agent-prompt.md` — deployment handoff for downstream agents.

### Changed
- `/api/map/<name>` removed; viewers use `/api/state/<name>` instead.
- `papermap.schema.load_corpus` still works but now delegates to the loaders package.

### Notes
- Resourcelib v0.2 (with the full `papermap_*` schema + `aggregate.py`) is a
  separate release. Today's adapter reads whichever fields a resourcelib
  corpus already carries.

## [0.2.0] — 2026-05-14

### Added
- `papermap serve` local web server with a sidebar corpus picker.
- Dockerfile + docker-compose.yml + Makefile.

## [0.1.0]

- Initial release.
- `papermap build` and `papermap check` CLI.
- Clustered-ring layout, plotly node-link rendering.
