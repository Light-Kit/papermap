"""LLM-batch fill missing `description:` fields on resourcelib items.

Reads a resourcelib YAML, finds items without a `description:` field,
asks an Anthropic Claude model to draft a 100–200 word descriptive
paragraph from the item's existing metadata (`why`, kind, topics, year,
status, org_type, region), and writes the descriptions back in place.

Usage:
    ANTHROPIC_API_KEY=sk-... python scripts/expand_descriptions.py \\
        examples/fm-to-virtual-cells-resourcelib.yaml \\
        --model claude-haiku-4-5-20251001 \\
        --limit 20 \\
        --dry-run

Defaults are conservative: dry-run on, limit 20, model = Haiku 4.5.
Drop --dry-run to actually write. Drop --limit to process every item
missing a description. Set ANTHROPIC_API_KEY in the environment.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from pathlib import Path

import yaml

try:
    import anthropic
except ImportError:
    anthropic = None


SYSTEM = """You are writing a short reference-card description for an item in
a biology-AI resource library. The library catalogues foundation models,
papers, datasets, tools, events, and people relevant to the "FM-to-virtual-
cells" landscape. Each description goes on a card a reader skims when
deciding whether to dig into the source. Write 120-180 words, plain prose,
no headings, no bullets. Lead with what the item IS, then why it matters
(what it changed, who it threatens, what gap it fills), then a single line
on what's open or contested about it. Be concrete. Don't repeat the
metadata back at the reader. Don't speculate beyond the supplied facts —
if you don't know, leave it out. Tone: a working researcher's notebook,
not a press release."""

USER_TEMPLATE = """Item id: {id}
Label: {label}
Kind: {kind}
Year: {year}
Topics: {topics}
Status: {status}
Org type: {org_type}
Region: {region}
URL: {url}

One-line why-it-matters (from the corpus):
{why}

Title / extra context (may be empty):
{title}
{meta}

Draft the 120-180 word description now. Plain prose."""


def build_user_prompt(item: dict) -> str:
    return USER_TEMPLATE.format(
        id=item.get("id", ""),
        label=item.get("label", ""),
        kind=item.get("kind", ""),
        year=item.get("year", ""),
        topics=", ".join(item.get("topics") or []),
        status=item.get("status", ""),
        org_type=item.get("org_type", ""),
        region=item.get("region", ""),
        url=item.get("url", ""),
        why=item.get("why", ""),
        title=item.get("title", ""),
        meta=item.get("meta", ""),
    )


def call_claude(client, model: str, prompt: str) -> str:
    """One API call → one description string."""
    resp = client.messages.create(
        model=model,
        max_tokens=400,
        system=SYSTEM,
        messages=[{"role": "user", "content": prompt}],
    )
    parts = [b.text for b in resp.content if b.type == "text"]
    return "\n\n".join(p.strip() for p in parts).strip()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("yaml_path", type=Path, help="resourcelib YAML to update in place")
    ap.add_argument("--model", default="claude-haiku-4-5-20251001",
                    help="Anthropic model id (default: Haiku 4.5)")
    ap.add_argument("--limit", type=int, default=20,
                    help="max items to process this run (default: 20)")
    ap.add_argument("--dry-run", action="store_true",
                    help="print drafts instead of writing them back")
    ap.add_argument("--only-id", action="append", default=[],
                    help="process only the given item ids (repeatable)")
    args = ap.parse_args()

    if anthropic is None:
        print("anthropic SDK not installed; pip install anthropic", file=sys.stderr)
        return 2
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ANTHROPIC_API_KEY not set", file=sys.stderr)
        return 2

    data = yaml.safe_load(args.yaml_path.read_text(encoding="utf-8"))
    items = data.get("items") or []
    targets = [
        i for i in items
        if isinstance(i, dict)
        and not i.get("description")
        and (not args.only_id or i.get("id") in args.only_id)
    ]
    if args.limit:
        targets = targets[: args.limit]
    if not targets:
        print("Nothing to expand — all items already have a description.")
        return 0

    client = anthropic.Anthropic()
    print(f"Expanding {len(targets)} item(s) with model={args.model} dry_run={args.dry_run}")

    for i, item in enumerate(targets, 1):
        prompt = build_user_prompt(item)
        try:
            text = call_claude(client, args.model, prompt)
        except Exception as exc:
            print(f"[{i}/{len(targets)}] {item.get('id')}: ERROR {exc}", file=sys.stderr)
            continue
        print(f"[{i}/{len(targets)}] {item.get('id')}: {len(text)} chars")
        if args.dry_run:
            print(f"  --- draft ---\n  {text}\n")
        else:
            item["description"] = text
        time.sleep(0.5)  # gentle pacing — adjust if you hit rate limits

    if not args.dry_run:
        # Write back, preserving the file's overall ordering. PyYAML doesn't
        # preserve formatting perfectly; you may want to run a YAML formatter
        # afterwards if the diff is noisy.
        args.yaml_path.write_text(
            yaml.safe_dump(data, sort_keys=False, allow_unicode=True, width=10_000),
            encoding="utf-8",
        )
        print(f"Wrote descriptions back to {args.yaml_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
