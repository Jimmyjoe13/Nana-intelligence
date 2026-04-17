from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
)
from googleapiclient.discovery import build
from google.oauth2 import service_account
import os
from datetime import datetime, timedelta

# Configuration
CREDENTIALS_PATH = 'analytics-credentials/n8n-ai-agent-451510-878f98de2c6e.json'
GA4_PROPERTY_ID = '497677784'
SITE_URL = 'sc-domain:nana-intelligence.fr'

def get_ga4_sources(client):
    """Récupère les sources de trafic de GA4."""
    request = RunReportRequest(
        property=f"properties/{GA4_PROPERTY_ID}",
        dimensions=[Dimension(name="sessionSource")],
        metrics=[Metric(name="sessions"), Metric(name="activeUsers")],
        date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
    )
    response = client.run_report(request)
    sources = {}
    for row in response.rows:
        source = row.dimension_values[0].value
        sessions = int(row.metric_values[0].value)
        sources[source] = sessions
    return sources

def get_gsc_clicks(credentials):
    """Récupère les clics de la Search Console."""
    try:
        service = build('searchconsole', 'v1', credentials=credentials)
        
        # Formatage des dates YYYY-MM-DD pour GSC
        today = datetime.now()
        start_date = (today - timedelta(days=30)).strftime('%Y-%m-%d')
        end_date = today.strftime('%Y-%m-%d')

        request = {
            'startDate': start_date,
            'endDate': end_date,
            'dimensions': ['query'],
            'rowLimit': 10
        }
        response = service.searchanalytics().query(siteUrl=SITE_URL, body=request).execute()
        clicks = []
        if 'rows' in response:
            for row in response['rows']:
                clicks.append({
                    'query': row['keys'][0],
                    'clicks': row['clicks']
                })
        return clicks
    except Exception as e:
        print(f"⚠️ Erreur Search Console : {e}")
        return []

def run_comparative_report():
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    ga4_client = BetaAnalyticsDataClient(credentials=credentials)
    
    print("--- Génération du rapport comparatif GA4 vs GSC ---")
    
    ga4_sources = get_ga4_sources(ga4_client)
    gsc_clicks = get_gsc_clicks(credentials)
    
    report_md = "# Rapport Comparatif Trafic vs SEO\n\n"
    
    # Section GA4
    report_md += "## Sources de trafic (GA4 - 30 derniers jours)\n"
    report_md += "| Source | Sessions |\n| :--- | :---: |\n"
    for src, count in ga4_sources.items():
        report_md += f"| {src} | {count} |\n"
    
    # Section GSC
    report_md += "\n## Mots-clés SEO (GSC - 30 derniers jours)\n"
    if not gsc_clicks:
        report_md += "⚠️ **Aucune donnée GSC accessible.**\n"
        report_md += "Vérifiez que le compte de service est ajouté à la Search Console.\n"
    else:
        report_md += "| Mot-clé | Clics GSC |\n| :--- | :---: |\n"
        for item in gsc_clicks:
            report_md += f"| {item['query']} | {item['clicks']} |\n"
            
    # Analyse
    report_md += "\n## Analyse Synthétique\n"
    organic_sessions = ga4_sources.get('google', 0)
    total_gsc_clicks = sum(item['clicks'] for item in gsc_clicks) if gsc_clicks else 0
    
    report_md += f"- **Sessions Organiques (GA4) :** {organic_sessions}\n"
    report_md += f"- **Clics SEO (GSC) :** {total_gsc_clicks}\n"
    
    if total_gsc_clicks > 0 and organic_sessions > 0:
        gap = abs(organic_sessions - total_gsc_clicks)
        report_md += f"\nNote : On observe un écart de {gap} entre les clics GSC et les sessions GA4, ce qui est normal (perte de tracking, cookies refusés, temps de chargement).\n"

    # Sauvegarde
    os.makedirs('reports', exist_ok=True)
    report_path = 'reports/Comp-GA4-vs-GSC.md'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report_md)
    
    print(f"✅ Rapport comparatif généré : {report_path}")
    return report_md

if __name__ == "__main__":
    run_comparative_report()
