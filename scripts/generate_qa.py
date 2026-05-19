"""Generate 4-Q qa blocks for method-paper items in a resourcelib YAML.

Two phases:

  generate  — for each item lacking qa, ask Claude whether the 4-Q
              (did / purpose / method / result) framing applies. If yes,
              emit four ~50-word answers. Cache results to a JSON file
              for resumability.

  merge     — surgically insert qa blocks into the YAML right after each
              item's `description:` line, preserving the rest of the
              file's formatting. Skips items already carrying a qa block.

Usage:

  ANTHROPIC_API_KEY=sk-... python scripts/generate_qa.py generate \
      examples/fm-to-virtual-cells-resourcelib.yaml \
      --cache _Temp/qa-cache.json --limit 3

  python scripts/generate_qa.py merge \
      examples/fm-to-virtual-cells-resourcelib.yaml \
      --cache _Temp/qa-cache.json --dry-run
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

import yaml

try:
    import anthropic
except ImportError:
    anthropic = None


SYSTEM = """You are filling out a structured Q/A card for an item in a
biology-AI resource library. Each card has four fields, each roughly 50
words:

  - did:     What did this paper do?
  - purpose: What is the purpose?
  - method:  What is the method?
  - result:  What is the result?

This format only fits items that INTRODUCE a model, algorithm, framework,
benchmark, or tool. It does NOT fit reviews, perspectives, position
papers, surveys, datasets-without-a-method, organizations, people, or
events. For those, return {"applicable": false}.

Be concrete, accurate, and concise. Don't speculate beyond the supplied
facts. Don't restate the metadata back at the reader. Tone: a working
researcher's notebook.

Return STRICT JSON only, no prose, no markdown fences. Schema:

  {"applicable": true, "did": "...", "purpose": "...", "method": "...", "result": "..."}

  or

  {"applicable": false}
"""

USER_TEMPLATE = """Item id: {id}
Label: {label}
Kind: {kind}
Year: {year}
Venue: {venue}
Authors: {authors}
Topics: {topics}
URL: {url}

Why-it-matters (one-line, from the corpus):
{why}

Existing description (background context — do not just rephrase it):
{description}

Decide whether the 4-Q card applies. If yes, fill all four fields
(~50 words each). If no, return {{"applicable": false}}. Return JSON only.
"""


def build_user_prompt(item: dict) -> str:
    return USER_TEMPLATE.format(
        id=item.get("id", ""),
        label=item.get("label") or item.get("name", ""),
        kind=item.get("kind", ""),
        year=item.get("year", ""),
        venue=item.get("venue", ""),
        authors=item.get("authors", ""),
        topics=", ".join(item.get("topics") or []),
        url=item.get("url", ""),
        why=item.get("why", ""),
        description=(item.get("description", "") or "")[:2500],
    )


def call_claude(client, model: str, prompt: str) -> dict:
    resp = client.messages.create(
        model=model,
        max_tokens=900,
        system=SYSTEM,
        messages=[{"role": "user", "content": prompt}],
    )
    parts = [b.text for b in resp.content if b.type == "text"]
    text = "\n".join(parts).strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```\s*$", "", text)
    return json.loads(text)


def generate(args: argparse.Namespace) -> int:
    if anthropic is None:
        print("anthropic SDK not installed; pip install anthropic", file=sys.stderr)
        return 2
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ANTHROPIC_API_KEY not set", file=sys.stderr)
        return 2

    data = yaml.safe_load(args.yaml_path.read_text(encoding="utf-8"))
    items = data.get("items") or []

    args.cache.parent.mkdir(parents=True, exist_ok=True)
    cache: dict[str, dict] = {}
    if args.cache.exists():
        cache = json.loads(args.cache.read_text(encoding="utf-8"))
        print(f"Resuming with {len(cache)} cached items")

    targets = [
        i for i in items
        if isinstance(i, dict)
        and i.get("id")
        and not i.get("qa")
        and i["id"] not in cache
    ]
    if args.limit:
        targets = targets[: args.limit]
    print(f"Generating qa for {len(targets)} item(s) with model={args.model}")

    client = anthropic.Anthropic()
    for i, item in enumerate(targets, 1):
        item_id = item["id"]
        prompt = build_user_prompt(item)
        try:
            result = call_claude(client, args.model, prompt)
        except Exception as exc:
            print(f"[{i}/{len(targets)}] {item_id}: ERROR {exc}", file=sys.stderr)
            continue
        cache[item_id] = result
        marker = "qa" if result.get("applicable") else "skip"
        print(f"[{i}/{len(targets)}] {item_id}: {marker}")
        args.cache.write_text(
            json.dumps(cache, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        time.sleep(args.pacing)

    print(f"Cache written to {args.cache}")
    return 0


def _yaml_quote(s: str) -> str:
    return "'" + s.replace("'", "''") + "'"


def merge(args: argparse.Namespace) -> int:
    if not args.cache.exists():
        print(f"Cache not found: {args.cache}", file=sys.stderr)
        return 2

    cache = json.loads(args.cache.read_text(encoding="utf-8"))
    applicable = {k: v for k, v in cache.items() if v.get("applicable")}
    print(
        f"Cache: {len(cache)} total, {len(applicable)} applicable, "
        f"{len(cache) - len(applicable)} non-applicable"
    )

    text = args.yaml_path.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)
    n = len(lines)

    item_starts: list[tuple[int, str]] = []
    for idx, line in enumerate(lines):
        m = re.match(r"^- id:\s+(\S+)", line)
        if m:
            item_starts.append((idx, m.group(1)))
    item_starts.append((n, "_eof_"))

    new_lines: list[str] = []
    inserted = 0
    skipped_no_desc = 0
    skipped_has_qa = 0

    cursor = 0
    for i in range(len(item_starts) - 1):
        start, item_id = item_starts[i]
        end, _ = item_starts[i + 1]
        # Append anything between cursor and start (corpus preamble for i==0).
        new_lines.extend(lines[cursor:start])
        cursor = end
        block = lines[start:end]
        result = applicable.get(item_id)
        if not result:
            new_lines.extend(block)
            continue
        if any(re.match(r"^  qa:\s*$", l) for l in block):
            skipped_has_qa += 1
            new_lines.extend(block)
            continue
        desc_idx = None
        for j, l in enumerate(block):
            if re.match(r"^  description:\s*", l):
                desc_idx = j
                break
        if desc_idx is None:
            skipped_no_desc += 1
            new_lines.extend(block)
            continue
        qa_lines = [
            "  qa:\n",
            f"    did: {_yaml_quote(result['did'])}\n",
            f"    purpose: {_yaml_quote(result['purpose'])}\n",
            f"    method: {_yaml_quote(result['method'])}\n",
            f"    result: {_yaml_quote(result['result'])}\n",
        ]
        new_lines.extend(block[: desc_idx + 1])
        new_lines.extend(qa_lines)
        new_lines.extend(block[desc_idx + 1 :])
        inserted += 1

    new_lines.extend(lines[cursor:])

    summary = (
        f"qa inserted for {inserted} item(s); "
        f"skipped {skipped_has_qa} already-tagged, "
        f"{skipped_no_desc} without description"
    )
    if args.dry_run:
        print("DRY: " + summary)
        return 0
    args.yaml_path.write_text("".join(new_lines), encoding="utf-8")
    print(summary)
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("phase", choices=["generate", "merge"])
    ap.add_argument("yaml_path", type=Path)
    ap.add_argument("--cache", type=Path, default=Path("_Temp/qa-cache.json"))
    ap.add_argument("--model", default="claude-sonnet-4-6")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--pacing", type=float, default=0.3)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    return generate(args) if args.phase == "generate" else merge(args)


if __name__ == "__main__":
    sys.exit(main())
