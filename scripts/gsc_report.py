"""
GSC Report Extractor — nana-intelligence.fr
Fetches Search Console data for the last 30 days and writes gsc_report_latest.json
"""

import json
import os
import sys
from datetime import date, timedelta

import requests

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
CLIENT_ID     = os.environ["GSC_CLIENT_ID"]
CLIENT_SECRET = os.environ["GSC_CLIENT_SECRET"]
REFRESH_TOKEN = os.environ["GSC_REFRESH_TOKEN"]
SITE_URL      = "sc-domain:nana-intelligence.fr"

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "gsc_report_latest.json")

# ---------------------------------------------------------------------------
# OAuth2 helpers
# ---------------------------------------------------------------------------
def get_access_token() -> str:
    resp = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "client_id":     CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "refresh_token": REFRESH_TOKEN,
            "grant_type":    "refresh_token",
        },
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]


# ---------------------------------------------------------------------------
# GSC API query
# ---------------------------------------------------------------------------
def query_gsc(
    access_token: str,
    start_date: str,
    end_date: str,
    dimensions: list[str],
    row_limit: int = 50,
    order_by_clicks: bool = True,
    extra_filters: list | None = None,
) -> list[dict]:
    url = f"https://searchconsole.googleapis.com/webmasters/v3/sites/{requests.utils.quote(SITE_URL, safe='')}/searchAnalytics/query"
    headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}

    body: dict = {
        "startDate":  start_date,
        "endDate":    end_date,
        "dimensions": dimensions,
        "rowLimit":   row_limit,
    }
    if order_by_clicks:
        body["orderBy"] = [{"fieldName": "clicks", "sortOrder": "DESCENDING"}]
    if extra_filters:
        body["dimensionFilterGroups"] = extra_filters

    resp = requests.post(url, headers=headers, json=body, timeout=30)
    resp.raise_for_status()
    rows = resp.json().get("rows", [])

    results = []
    for row in rows:
        item = {d: row["keys"][i] for i, d in enumerate(dimensions)}
        item["clicks"]      = row.get("clicks", 0)
        item["impressions"] = row.get("impressions", 0)
        item["ctr"]         = round(row.get("ctr", 0) * 100, 2)
        item["position"]    = round(row.get("position", 0), 1)
        results.append(item)
    return results


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    end_date   = date.today() - timedelta(days=3)   # GSC data has ~3-day lag
    start_date = end_date - timedelta(days=29)       # 30-day window

    start_str = start_date.isoformat()
    end_str   = end_date.isoformat()

    print(f"Fetching GSC data from {start_str} to {end_str} …", flush=True)

    token = get_access_token()

    # --- Overall metrics (no dimensions) ---
    overall_resp = requests.post(
        f"https://searchconsole.googleapis.com/webmasters/v3/sites/{requests.utils.quote(SITE_URL, safe='')}/searchAnalytics/query",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json={"startDate": start_str, "endDate": end_str, "rowLimit": 1},
        timeout=30,
    )
    overall_resp.raise_for_status()
    overall_data = overall_resp.json()
    overall = {
        "clicks":      overall_data.get("clicks", 0),
        "impressions": overall_data.get("impressions", 0),
        "ctr":         round(overall_data.get("ctr", 0) * 100, 2),
        "position":    round(overall_data.get("position", 0), 1),
    }
    # Fallback: sum from rows if top-level fields absent
    if not any(overall.values()) and overall_data.get("rows"):
        r = overall_data["rows"][0]
        overall = {
            "clicks":      r.get("clicks", 0),
            "impressions": r.get("impressions", 0),
            "ctr":         round(r.get("ctr", 0) * 100, 2),
            "position":    round(r.get("position", 0), 1),
        }

    # --- Top queries ---
    top_queries = query_gsc(token, start_str, end_str, ["query"], row_limit=50)

    # --- Top pages ---
    top_pages = query_gsc(token, start_str, end_str, ["page"], row_limit=20)

    # --- Quick wins: positions 5–15, sorted by impressions ---
    # NOTE: GSC API does NOT support 'position' as a filter dimension.
    # We fetch all query+page combos and filter in Python.
    all_query_pages = query_gsc(
        token, start_str, end_str,
        ["query", "page"],
        row_limit=200,
        order_by_clicks=False,
    )
    quick_wins = [
        r for r in all_query_pages
        if 4 < r.get("position", 0) < 16
    ]
    # Sort by impressions desc, keep top 30
    quick_wins.sort(key=lambda x: x.get("impressions", 0), reverse=True)
    quick_wins = quick_wins[:30]

    # --- Low CTR pages (position < 10, CTR < 2%) ---
    all_pages_with_pos = query_gsc(
        token, start_str, end_str,
        ["page"],
        row_limit=100,
        order_by_clicks=False,
    )
    low_ctr_pages = [
        r for r in all_pages_with_pos
        if r.get("position", 99) < 10 and r.get("ctr", 100) < 2 and r.get("impressions", 0) > 5
    ]
    low_ctr_pages.sort(key=lambda x: x.get("impressions", 0), reverse=True)

    report = {
        "period":        {"start": start_str, "end": end_str},
        "overall":       overall,
        "top_queries":   top_queries,
        "top_pages":     top_pages,
        "quick_wins":    quick_wins,
        "low_ctr_pages": low_ctr_pages,
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f"Report saved → {OUTPUT_FILE}", flush=True)
    print(f"Overall: {overall}", flush=True)
    print(f"Queries: {len(top_queries)} | Pages: {len(top_pages)} | Quick wins: {len(quick_wins)}", flush=True)


if __name__ == "__main__":
    main()
