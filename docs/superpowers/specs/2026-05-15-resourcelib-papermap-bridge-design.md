# resourcelib ↔ papermap bridge — design

**Date:** 2026-05-15
**Status:** approved (design), pending spec review
**Repos touched:** `Light-Kit/resourcelib` (core), `Light-Kit/papermap` (plugin)
**Sibling unblocked:** `Light-Kit/resourcelib-views` (already pins `resourcelib>=0.2`)

## Goal

Make a single **resourcelib** YAML the source of truth for the whole
Light-Kit plugin ecosystem: the landscape card grid (`resourcelib
build`), the citation graph (`papermap build` / `serve`), and ranked
dossier pages (`resourcelib-views generate`). One file, N views.

Today the bridge between resourcelib and papermap is one-directional
and incomplete: `resourcelib export --to-papermap` emits only the
`papers:` section, so the output is not a loadable papermap corpus.
Users have to hand-paste papers into a separate papermap YAML and
maintain it in parallel.

## Ecosystem framing

resourcelib is the **thin core** of a plugin ecosystem:

```
                       mycorpus.yaml
                  (one resourcelib YAML)
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
     resourcelib   resourcelib-views     papermap
       (core)         (plugin)          (plugin)
   schema +         ranked dossiers   citation graph
   validator +      per person/       clustered-ring
   card grid +      institute/theme   node-link map
   aggregate
   helpers
```

Plugins all follow the same import contract:

```python
from resourcelib import (
    Doc, Item, load, validate,
    items_by_kind, items_by_topic, topic_counts, kind_counts,
)
from resourcelib.validator import ValidationError
```

…and ship their own CLI. `resourcelib-views` is the first plugin and
sets the convention; `papermap` becomes the second by following the
same contract for the resourcelib path (its native-papermap path
remains, so it works standalone too).

## Approach

resourcelib's YAML grows to carry the entire papermap surface as optional
top-level sections. papermap learns to read resourcelib YAML directly and
project it into its existing `Corpus` dataclass. The two tools couple at
the YAML level by design — the user explicitly chose "all in resourcelib"
for maximum DRY.

Independently, resourcelib v0.2 also formalises the aggregation helpers
(`items_by_kind` / `items_by_topic` / `topic_counts` / `kind_counts`)
that `resourcelib-views` already pins for. Bundling these into the same
v0.2 release means one core release unblocks both plugins.

## Non-goals (YAGNI)

- No two-file workflow with an `edges.yaml` sidecar.
- No back-sync of papermap-side edits into resourcelib (resourcelib is the
  single source of truth; papermap is read-only over it).
- No schema-versioning header in the YAML; backwards-compatibility is
  handled by accepting both old and new forms of `papermap_categories:`.
- No new visualisations or UI work beyond what `papermap serve` already
  delivers — the same UI just opens resourcelib YAMLs.

## resourcelib v0.2 — schema upgrade + aggregate helpers

This release ships **two** independent additions, both backwards-compatible:

1. **`papermap_*:` schema additions** — for the papermap bridge (this spec).
2. **`resourcelib.aggregate` module** — the helpers `resourcelib-views`
   already imports. Pulling them out of any ad-hoc location into a
   dedicated module formalises them as the public plugin API.

### Aggregate helpers (`resourcelib/aggregate.py`)

A new module with four pure functions over a `Doc`:

- `items_by_kind(doc) -> dict[str, list[Item]]` — items grouped by `kind`.
- `items_by_topic(doc) -> dict[str, list[Item]]` — items grouped by each
  topic in `item.topics`; an item with N topics appears under N keys.
- `kind_counts(doc) -> dict[str, int]` — `kind` → number of items.
- `topic_counts(doc) -> dict[str, int]` — topic → number of items.

These are re-exported from `resourcelib/__init__.py` so plugins import
them as `from resourcelib import items_by_kind`. Unit-tested with a
small fixture corpus. No new dependencies.

### Schema additions for the papermap bridge

Four optional top-level sections, additive to the current schema:

```yaml
papermap_categories:
  # was: ["reckoning", "scfm", ...]   (list of strings — still accepted)
  - {id: reckoning, label: "The reckoning", color: "#d62728"}
  - {id: scfm,      label: "Model papers",  color: "#1f77b4"}

papermap_relations:
  - {id: builds_on, label: "builds on / lineage",   color: "#c2c2c2", dash: solid}
  - {id: evaluates, label: "evaluates / critiques", color: "#e8888a", dash: dash}

papermap_edges:
  - [kedzierska, ahlmann-eltze-2025, builds_on]
  - [ahlmann-eltze-2025, scgpt, evaluates]

papermap_layout:
  hub_category: reckoning
  hub_node: ahlmann-eltze-2025
  ring_radius: 12.0
  # all other papermap LayoutConfig fields accepted as-is
```

### Schema changes (`resourcelib/schema.py`)

- `Doc.papermap_categories`: keep the field name, accept either
  `list[str]` (current) or `list[dict]` with `{id, label, color}`. After
  load, normalise to a list of mappings — a bare string `"reckoning"`
  becomes `{id: "reckoning", label: "reckoning", color: <next default>}`.
  Default colors come from a small built-in palette in resourcelib
  indexed by position (the Plotly D3 colors:
  `#1f77b4 #ff7f0e #2ca02c #d62728 #9467bd #8c564b #e377c2 #7f7f7f #bcbd22 #17becf`).
  Users who want explicit colors supply the mapping form.
- New field `Doc.papermap_relations: list[dict]`, default `[]`.
- New field `Doc.papermap_edges: list[list]`, default `[]`.
- New field `Doc.papermap_layout: dict`, default `{}`.

### Validator changes (`resourcelib/validator.py`)

Add four checks, each producing a `ValidationError` (collected with
existing errors before raising):

1. `papermap_categories:` ids are unique; each per-item
   `papermap_category` value refers to a declared id (already enforced
   for the list-of-strings form — extend to mappings).
2. `papermap_relations:` ids are unique.
3. `papermap_edges:` — for each `[source, target, relation]`:
   `source` and `target` are item ids with `kind: paper` AND
   `papermap_category` set; `relation` is a declared relation id.
4. `papermap_layout.hub_category`, if set, refers to a declared
   papermap category id; `papermap_layout.hub_node`, if set, refers to
   an item id whose `papermap_category` equals `hub_category`.

### Export upgrade (`resourcelib/cli.py`)

`resourcelib export --to-papermap` now emits a **complete** papermap
corpus — `title`, `categories`, `relations`, `papers`, `edges`,
`layout`. With the source YAML carrying all four `papermap_*` sections,
no information has to be invented. The output passes `papermap check`
without edits.

If a source has `papermap_categories` but no `papermap_relations` or
`papermap_edges`, the export still produces a valid corpus — relations
default to `[]` and edges to `[]`, which papermap accepts (a node-only
map). The `papermap_layout:` section, if absent, is omitted.

### Tests (`resourcelib/tests/test_resourcelib.py`)

- Validator rejects: edge to non-paper item; edge to item lacking
  `papermap_category`; edge with unknown relation; duplicate relation
  id; layout referencing unknown category or node.
- `papermap_categories:` accepts both list-of-strings and list-of-mappings.
- Snapshot: export the upgraded example YAML; assert the emitted text
  parses as a valid papermap corpus (load it with `papermap.load_corpus`
  via subprocess to keep test scope clean, or via a guarded import in
  the test).

## papermap v0.3 — resourcelib loader

### New module: `papermap/resourcelib_loader.py`

```python
def load_from_resourcelib(path: str | Path) -> Corpus:
    """Load a resourcelib YAML and project the papermap-eligible subset
    into a papermap Corpus."""
```

The function:
1. Imports `resourcelib`; if unavailable, raises
   `CorpusError("install papermap[resourcelib] to load resourcelib YAMLs")`.
2. Calls `resourcelib.load(path)` and `resourcelib.validate(doc)`.
   On `ValidationError`, re-raises as `CorpusError(str(e))`.
3. Projects the `Doc` into a `Corpus`:
   - `title` ← `doc.title`; `subtitle` ← `doc.subtitle` if present
     (papermap's `Corpus.subtitle` is optional, so a missing one is fine).
   - `categories` ← `doc.papermap_categories` (after the normalisation
     done in resourcelib's loader).
   - `relations` ← `doc.papermap_relations`, mapped to `Relation`
     dataclasses (defaults: `dash="solid"` if missing).
   - `papers` ← items where `kind == "paper"` AND `papermap_category` is
     set, mapped to `Paper` dataclasses (`label` ← first 40 chars of
     `name`; `title` ← `name`; `meta` ← `f"{venue} · {year}"` joined as
     existing export does; `why` ← `why`; `weight` defaults to 1 since
     resourcelib doesn't carry it).
   - `edges` ← `doc.papermap_edges`, mapped to `Edge` dataclasses.
   - `layout` ← `LayoutConfig(**doc.papermap_layout)`.

### Auto-detect in `papermap/schema.py`

Modify `load_corpus(path)` to peek at top-level keys after YAML parse:

```python
if isinstance(raw, dict) and "vocab" in raw and "items" in raw:
    return load_from_resourcelib(path)
# … existing native-papermap path
```

The auto-detect is **silent** (no log line, no flag), as agreed. A
native-papermap YAML never has both `vocab:` and `items:`, so the
detection is unambiguous.

### Optional extra in `pyproject.toml`

```toml
[project.optional-dependencies]
resourcelib = ["resourcelib @ git+https://github.com/Light-Kit/resourcelib.git@v0.2.0"]
```

The pin is `v0.2.0` (or whatever tag resourcelib ships at). Users can
`pip install "papermap[resourcelib]"` to enable the loader. The base
install stays plotly+pyyaml+flask only — no resourcelib weight for users
who only have native papermap YAMLs.

### Tests: `papermap/tests/test_resourcelib_loader.py`

- A minimal in-memory resourcelib-shaped YAML (vocab + items +
  papermap_* sections) loads via `load_corpus` and returns a `Corpus`
  with the expected papers / categories / relations / edges / layout.
- `load_from_resourcelib` raises `CorpusError("install papermap[resourcelib]…")`
  when resourcelib isn't importable (use `monkeypatch` to hide it).
- A resourcelib YAML whose validator fails surfaces the error as
  `CorpusError`, not the resourcelib type.
- The `serve` test client returns the projected map for a resourcelib
  YAML in the scanned directory (covers the auto-detect dispatch in the
  server scanner).
- All existing papermap tests stay green — the auto-detect only adds a
  new code path inside `load_corpus`; the native-papermap path is
  untouched.

## Data flow

```
my-corpus.yaml  ──┬──>  resourcelib check / build           ──>  catalog.md
   (resourcelib   │
    shape with    ├──>  resourcelib-views generate          ──>  dossiers/*.md
    papermap_* )  │
                  └──>  papermap   check / build / serve    ──>  map.html
                                                             ──>  live web view
```

One file, three views. To preview the citation-graph subset standalone
(e.g. to commit a static papermap YAML alongside a corpus snapshot),
`resourcelib export --to-papermap` still produces a complete papermap
corpus that any plain-papermap user can render without installing
resourcelib.

## Error handling

- **Missing `[resourcelib]` extra:** `load_from_resourcelib` raises
  `CorpusError("install papermap[resourcelib] to load resourcelib YAMLs")`.
  The CLI surfaces this message via the existing `_build` / `_check` /
  `_serve` error paths.
- **resourcelib validation failure:** caught and re-raised as
  `CorpusError(str(e))` to keep papermap's error surface consistent.
- **Native-papermap YAML accidentally containing `vocab:` or `items:`
  keys:** very unlikely — these are not papermap keywords — and would
  produce a clean "resourcelib expects … " error from resourcelib's own
  validator if it happened.
- **Empty papermap-eligible subset (no papers with `papermap_category`):**
  produces an empty `Corpus`; papermap's existing CorpusError "no
  papers" path fires.

## Release sequencing

Two stages, two repos, two version bumps. The papermap stage cannot land
before the resourcelib stage because papermap pins the new resourcelib
version. resourcelib-views also picks up its v0.2 dependency from the
same release — no work in that repo, but its CI starts running against
a real published v0.2 instead of an aspirational pin.

1. **resourcelib v0.2.0** — schema upgrade + validator + completed
   export + new `aggregate.py` module (`items_by_kind` / `items_by_topic`
   / `topic_counts` / `kind_counts`, formalising what
   `resourcelib-views` already imports) + tests + README updates (incl.
   fixing the stale `LiudengZhang/papermap` link, adding a
   "plugin ecosystem" section). The example YAML is upgraded in place
   to carry the four new sections (the 33 already-tagged papers get
   their colors, relations, edges, and hub layout). All existing
   `resourcelib check` / `build` commands keep working; `resourcelib-views`
   keeps working unchanged. Tag `v0.2.0`.
2. **papermap v0.3.0** — `resourcelib_loader.py` + auto-detect in
   `load_corpus` + `[resourcelib]` extra (pinned to resourcelib v0.2.0)
   + tests + README. Tag `v0.3.0`.

## Documentation

- **resourcelib README** — fix the stale `LiudengZhang/papermap` URL,
  add a top-level **"Plugin ecosystem"** section that names
  `resourcelib-views` and `papermap` as the two current plugins, document
  the four new `papermap_*:` top-level sections and the upgraded
  `papermap_categories:` form, document `resourcelib.aggregate` as the
  public plugin API, and show the one-YAML-N-views workflow.
- **resourcelib-views README** — no code changes needed, but a one-line
  edit noting it's "one of two plugins" alongside papermap.
- **papermap README** — add a "From a resourcelib YAML" section
  showing `pip install "papermap[resourcelib]"` and `papermap build my-corpus.yaml`
  working transparently on either YAML shape; describe papermap as a
  resourcelib plugin (with the native-papermap path preserved).

## Out of scope (revisit later, not in this design)

- **Multi-corpus references / `$include:`** — a papermap YAML pulling
  in papers from one resourcelib YAML and edges from another. Not
  needed yet.
- **Web UI editor for edges** — `papermap serve` is still read-only;
  edges are still authored by editing the resourcelib YAML by hand.
- **Stricter schema enforcement on `papermap_layout:`** — resourcelib
  passes it through as a dict and papermap validates via `LayoutConfig`
  construction. Adequate for now.
