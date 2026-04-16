#!/usr/bin/env python3
"""
gsc_report.py — Extracts Google Search Console data for nana-intelligence.fr
Outputs: scripts/gsc_report_latest.json

Required env vars:
  GSC_CLIENT_ID
  GSC_CLIENT_SECRET
  GSC_REFRESH_TOKEN
"""

import os
import json
from datetime import date, timedelta

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# sc-domain property includes both www and non-www
SITE_URL = "sc-domain:nana-intelligence.fr"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
OUTPUT_PATH = "scripts/gsc_report_latest.json"


def get_credentials():
    creds = Credentials(
        token=None,
        refresh_token=os.environ["GSC_REFRESH_TOKEN"],
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.environ["GSC_CLIENT_ID"],
        client_secret=os.environ["GSC_CLIENT_SECRET"],
        scopes=SCOPES,
    )
    creds.refresh(Request())
    return creds


def query_gsc(service, start, end, dimensions, extra_filters=None, row_limit=50, order_by_clicks=True):
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    if order_by_clicks:
        body["orderBy"] = [{"fieldName": "clicks", "sortOrder": "DESCENDING"}]
    if extra_filters:
        body["dimensionFilterGroups"] = extra_filters
    response = service.searchanalytics().query(siteUrl=SITE_URL, body=body).execute()
    return response.get("rows", [])


def main():
    print("Authentification GSC...")
    creds = get_credentials()
    service = build("searchconsole", "v1", credentials=creds)

    end_date = (date.today() - timedelta(days=3)).isoformat()
    start_date = (date.today() - timedelta(days=33)).isoformat()

    print(f"Extraction donnees du {start_date} au {end_date}...")

    # Overall metrics
    overall_rows = query_gsc(service, start_date, end_date, [], order_by_clicks=False, row_limit=1)
    overall = overall_rows[0] if overall_rows else {}

    # Top 50 queries by clicks
    top_queries = query_gsc(service, start_date, end_date, ["query"], row_limit=50)

    # Top 20 pages by clicks
    top_pages = query_gsc(service, start_date, end_date, ["page"], row_limit=20)

    # Quick wins: queries between position 5 and 15
    quick_wins = query_gsc(
        service, start_date, end_date,
        ["query", "page"],
        extra_filters=[{
            "filters": [
                {"dimension": "position", "operator": "greaterThan", "expression": "4"},
                {"dimension": "position", "operator": "lessThan", "expression": "16"},
            ]
        }],
        row_limit=30,
        order_by_clicks=False,
    )

    # Low CTR pages: impressions > 50 but CTR < 3%
    all_pages = query_gsc(service, start_date, end_date, ["page"], row_limit=50, order_by_clicks=False)
    low_ctr_pages = [
        r for r in all_pages
        if r.get("impressions", 0) > 50 and r.get("ctr", 1) < 0.03
    ]

    report = {
        "generated_at": date.today().isoformat(),
        "period": {"start": start_date, "end": end_date},
        "site": SITE_URL,
        "overall": {
            "clicks": int(overall.get("clicks", 0)),
            "impressions": int(overall.get("impressions", 0)),
            "ctr": round(overall.get("ctr", 0) * 100, 2),
            "position": round(overall.get("position", 0), 1),
        },
        "top_queries": [
            {
                "query": r["keys"][0],
                "clicks": int(r.get("clicks", 0)),
                "impressions": int(r.get("impressions", 0)),
                "ctr": round(r.get("ctr", 0) * 100, 2),
                "position": round(r.get("position", 0), 1),
            }
            for r in top_queries
        ],
        "top_pages": [
            {
                "page": r["keys"][0],
                "clicks": int(r.get("clicks", 0)),
                "impressions": int(r.get("impressions", 0)),
                "ctr": round(r.get("ctr", 0) * 100, 2),
                "position": round(r.get("position", 0), 1),
            }
            for r in top_pages
        ],
        "quick_wins": [
            {
                "query": r["keys"][0],
                "page": r["keys"][1],
                "clicks": int(r.get("clicks", 0)),
                "impressions": int(r.get("impressions", 0)),
                "ctr": round(r.get("ctr", 0) * 100, 2),
                "position": round(r.get("position", 0), 1),
            }
            for r in quick_wins
        ],
        "low_ctr_pages": [
            {
                "page": r["keys"][0],
                "impressions": int(r.get("impressions", 0)),
                "ctr": round(r.get("ctr", 0) * 100, 2),
                "position": round(r.get("position", 0), 1),
            }
            for r in low_ctr_pages
        ],
    }

    os.makedirs("scripts", exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f"\nRapport GSC sauvegarde : {OUTPUT_PATH}")
    print(f"  Periode     : {start_date} -> {end_date}")
    print(f"  Clics       : {report['overall']['clicks']}")
    print(f"  Impressions : {report['overall']['impressions']}")
    print(f"  CTR         : {report['overall']['ctr']}%")
    print(f"  Position    : {report['overall']['position']}")
    print(f"  Quick wins  : {len(report['quick_wins'])} requetes pos. 5-15")
    print(f"  CTR faible  : {len(report['low_ctr_pages'])} pages")


if __name__ == "__main__":
    main()
