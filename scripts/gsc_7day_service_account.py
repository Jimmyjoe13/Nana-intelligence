import os
import json
from datetime import date, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Configuration
SERVICE_ACCOUNT_FILE = r"C:\Users\jimmy\Projet\Nana-intelligence\analytics-credentials\n8n-ai-agent-451510-878f98de2c6e.json"
SITE_URL = "sc-domain:nana-intelligence.fr"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

def get_service():
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return build("searchconsole", "v1", credentials=creds)

def query_gsc(service, start, end, dimensions, row_limit=10):
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    response = service.searchanalytics().query(siteUrl=SITE_URL, body=body).execute()
    return response.get("rows", [])

def main():
    service = get_service()
    
    # GSC data usually has a 2-3 day delay
    end_date_obj = date.today() - timedelta(days=3)
    start_date_obj = end_date_obj - timedelta(days=6)
    
    start_date = start_date_obj.isoformat()
    end_date = end_date_obj.isoformat()
    
    print(f"Analyse GSC pour {SITE_URL}")
    print(f"Période : {start_date} au {end_date} (7 jours)")
    print("-" * 50)
    
    # 1. Overall Metrics
    overall = query_gsc(service, start_date, end_date, [])
    if overall:
        m = overall[0]
        clicks = int(m.get('clicks', 0))
        impressions = int(m.get('impressions', 0))
        ctr = m.get('ctr', 0) * 100
        pos = m.get('position', 0)
        print(f"TOTAL")
        print(f"  Clics        : {clicks}")
        print(f"  Impressions  : {impressions}")
        print(f"  CTR          : {ctr:.2f}%")
        print(f"  Position Moy : {pos:.1f}")
    else:
        print("Aucune donnée globale trouvée.")
        return

    print("-" * 50)
    
    # 2. Top Queries
    print("TOP 10 REQUÊTES (par clics/impressions)")
    queries = query_gsc(service, start_date, end_date, ["query"], row_limit=15)
    for i, r in enumerate(queries, 1):
        q = r['keys'][0]
        c = int(r.get('clicks', 0))
        imp = int(r.get('impressions', 0))
        p = r.get('position', 0)
        print(f"{i:2}. {q:<40} | {c:3} clics | {imp:4} imp. | pos {p:.1f}")

    print("-" * 50)

    # 3. Top Pages
    print("TOP 5 PAGES (par clics/impressions)")
    pages = query_gsc(service, start_date, end_date, ["page"], row_limit=5)
    for i, r in enumerate(pages, 1):
        p_url = r['keys'][0].replace("https://nana-intelligence.fr/", "/")
        c = int(r.get('clicks', 0))
        imp = int(r.get('impressions', 0))
        p = r.get('position', 0)
        print(f"{i:2}. {p_url:<40} | {c:3} clics | {imp:4} imp. | pos {p:.1f}")

if __name__ == "__main__":
    main()
