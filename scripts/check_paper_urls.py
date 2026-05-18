"""Verify external paper URLs against the Crossref/OpenAlex APIs.

Browser-based checks failed: Cell + Nature + bioRxiv all gate the page with
Cloudflare Turnstile, so any headless visit returns an interstitial. Instead,
extract a DOI or PII from each URL and hit Crossref directly (free, no auth,
no bot challenge). For PII-only URLs we ask Crossref by `alternative-id` so
fabricated PIIs return zero hits.

Outputs /tmp/blog-paper-check.json + a human-readable summary.
"""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.parse
import urllib.request
from urllib.error import HTTPError

UA = "papermap-link-audit/0.1 (mailto:liudengzhang91@gmail.com)"
CROSSREF = "https://api.crossref.org/works"
OPENALEX_DOI = "https://api.openalex.org/works/doi:"

DOI_RE = re.compile(r"10\.\d{4,9}/[-._;()/:A-Z0-9]+", re.I)
PII_IN_URL = re.compile(r"/(S\d{4}-\d{4}[%(\d]+\d{5}-?[\dA-Z])", re.I)


def get_json(url: str, timeout: float = 20.0):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def extract_doi(url: str) -> str | None:
    if "doi.org/" in url:
        return url.split("doi.org/", 1)[1].split("#")[0].rstrip("/")
    if "/articles/s4" in url:  # nature.com pattern
        m = re.search(r"articles/(s\d{5}-\d{3}-\d{4,5}-[\dxXyY])", url)
        if m:
            # Nature: doi = 10.1038/<article-id>
            return f"10.1038/{m.group(1)}"
    if "biorxiv.org/content/" in url:
        m = re.search(r"content/(10\.\d{4,9}/[^/?#v]+)", url)
        if m:
            return m.group(1)
    if "/pubmed/" in url or "/pubmed.ncbi" in url:
        return None  # PMID, not DOI; handle separately
    if "ncbi.nlm.nih.gov/pmc/articles/PMC" in url or "pmc.ncbi.nlm.nih.gov" in url:
        return None  # PMCID; handle separately
    if "advanced.onlinelibrary.wiley.com/doi/" in url:
        return url.split("/doi/", 1)[1].split("?")[0].rstrip("/")
    return None


def extract_pii(url: str) -> str | None:
    raw = urllib.parse.unquote(url)
    m = re.search(r"/(S\d{4}-\d{4}\(\d{2}\)\d{5}-[\dA-Z])", raw, re.I)
    if m:
        return m.group(1)
    return None


def crossref_by_doi(doi: str) -> dict | None:
    try:
        data = get_json(f"{CROSSREF}/{urllib.parse.quote(doi, safe='')}")
        return data.get("message")
    except HTTPError as e:
        if e.code == 404:
            return None
        raise


def crossref_by_pii(pii: str) -> list[dict]:
    """Search by PII via alternative-id filter, then by free-text as fallback."""
    q = urllib.parse.urlencode({"query": pii, "rows": 3})
    try:
        data = get_json(f"{CROSSREF}?{q}")
        return data.get("message", {}).get("items", [])
    except HTTPError:
        return []


def crossref_search(query: str, rows: int = 3) -> list[dict]:
    q = urllib.parse.urlencode({"query.bibliographic": query, "rows": rows})
    try:
        data = get_json(f"{CROSSREF}?{q}")
        return data.get("message", {}).get("items", [])
    except HTTPError:
        return []


def pmid_resolve(url: str) -> dict | None:
    m = re.search(r"pubmed/(\d+)", url) or re.search(r"pubmed\.ncbi\.nlm\.nih\.gov/(\d+)", url)
    if not m:
        return None
    pmid = m.group(1)
    try:
        # ESummary
        url = (
            "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
            f"?db=pubmed&id={pmid}&retmode=json"
        )
        data = get_json(url)
        result = (data.get("result") or {}).get(pmid)
        return result
    except HTTPError:
        return None


def pmc_resolve(url: str) -> dict | None:
    m = re.search(r"PMC(\d+)", url)
    if not m:
        return None
    pmcid = "PMC" + m.group(1)
    try:
        url = (
            "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
            f"?db=pmc&id={m.group(1)}&retmode=json"
        )
        data = get_json(url)
        result = (data.get("result") or {}).get(m.group(1))
        return result
    except HTTPError:
        return None


def main():
    audit = json.load(open("/tmp/blog-link-audit.json"))
    rows = audit["external_paper"]
    out = []
    seen = set()
    for row in rows:
        href = row["href"]
        if href in seen:
            continue
        seen.add(href)
        verdict = {"href": href, "link_text": row["link_text"], "lines": row["lines"]}

        # Strategy 1: DOI extracted from URL → Crossref
        doi = extract_doi(href)
        if doi:
            msg = crossref_by_doi(doi)
            if msg:
                verdict["status"] = "ok"
                verdict["resolved_doi"] = doi
                verdict["title"] = (msg.get("title") or [""])[0]
                verdict["authors"] = ", ".join(
                    f"{a.get('family','?')}" for a in (msg.get("author") or [])[:3]
                )
                verdict["year"] = (msg.get("issued", {}).get("date-parts") or [[None]])[0][0]
            else:
                verdict["status"] = "BROKEN-doi"
                verdict["evidence"] = f"crossref 404 for {doi}"
                verdict["candidates"] = []
        # Strategy 2: PII from Cell URL → Crossref search
        elif (pii := extract_pii(href)):
            hits = crossref_by_pii(pii)
            match = next(
                (h for h in hits if pii.replace("(", "").replace(")", "") in
                 " ".join(h.get("alternative-id") or []).replace("(", "").replace(")", "")),
                None,
            )
            if match:
                verdict["status"] = "ok"
                verdict["resolved_doi"] = match.get("DOI")
                verdict["title"] = (match.get("title") or [""])[0]
            else:
                verdict["status"] = "BROKEN-pii"
                verdict["evidence"] = f"no crossref record carries PII {pii}"
                verdict["pii"] = pii
        # Strategy 3: PubMed PMID
        elif "pubmed.ncbi" in href or "/pubmed/" in href:
            r = pmid_resolve(href)
            if r and r.get("title"):
                verdict["status"] = "ok"
                verdict["title"] = r["title"]
                verdict["authors"] = r.get("sortfirstauthor", "?")
                verdict["year"] = r.get("pubdate", "")[:4]
            else:
                verdict["status"] = "BROKEN-pmid"
                verdict["evidence"] = "no eutils record"
        # Strategy 4: PMC
        elif "PMC" in href:
            r = pmc_resolve(href)
            if r and r.get("title"):
                verdict["status"] = "ok"
                verdict["title"] = r["title"]
            else:
                verdict["status"] = "BROKEN-pmc"
                verdict["evidence"] = "no eutils record"
        # Strategy 5: bare URLs (e.g. biorxiv.org homepage)
        elif href.rstrip("/") in {"https://www.biorxiv.org"}:
            verdict["status"] = "BROKEN-bare"
            verdict["evidence"] = "links to journal homepage, not a paper"
        # Strategy 6: ICLR / ICML poster pages — accept 200 from curl probe
        else:
            verdict["status"] = "needs-manual"
            verdict["evidence"] = "no DOI/PII/PMID extracted; manual check"

        out.append(verdict)
        time.sleep(0.4)  # polite to crossref

    # Print summary
    by_status = {}
    for v in out:
        by_status.setdefault(v["status"], []).append(v)
    print(f"\n=== Crossref/eutils verification ({len(out)} unique URLs) ===")
    for s in sorted(by_status):
        print(f"  {s:18s}  {len(by_status[s])}")
    print()
    for v in out:
        if v["status"] != "ok":
            lines = ", ".join(f"{f}:{n}" for f, n in v["lines"]) or "?"
            print(f"[{v['status']}] {lines}")
            print(f"  text: {v['link_text'][:80]}")
            print(f"  href: {v['href']}")
            print(f"  why : {v.get('evidence','')}")
            print()
    open("/tmp/blog-paper-check.json", "w").write(json.dumps(out, indent=2))
    print(f"\nFull report → /tmp/blog-paper-check.json")


if __name__ == "__main__":
    sys.exit(main())
