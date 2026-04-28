from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
    OrderBy
)
from google.oauth2 import service_account
import os

# Configuration
CREDENTIALS_PATH = 'analytics-credentials/n8n-ai-agent-451510-878f98de2c6e.json'
PROPERTY_ID = '497677784'

def run_audit():
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    client = BetaAnalyticsDataClient(credentials=credentials)

    print(f"--- Deep Dive Audit GA4 pour la propriété {PROPERTY_ID} ---")
    
    # 1. Sources de Trafic
    print("\n[1] Analyse des Sources de Trafic...")
    request_sources = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="sessionSourceMedium")],
        metrics=[Metric(name="activeUsers"), Metric(name="sessions"), Metric(name="conversions")],
        date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
    )
    
    # 2. Performance des Pages
    print("[2] Analyse de l'engagement par Page...")
    request_pages = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="pagePath")],
        metrics=[
            Metric(name="sessions"),
            Metric(name="engagementRate"),
            Metric(name="averageSessionDuration"),
            Metric(name="conversions")
        ],
        date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)]
    )

    # 3. Événements de Conversion
    print("[3] Analyse des Événements...")
    request_events = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="eventName")],
        metrics=[Metric(name="eventCount")],
        date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)]
    )

    try:
        sources_resp = client.run_report(request_sources)
        pages_resp = client.run_report(request_pages)
        events_resp = client.run_report(request_events)

        print("\n--- RÉSULTATS DES SOURCES ---")
        for row in sources_resp.rows:
            print(f"Source: {row.dimension_values[0].value:<25} | Users: {row.metric_values[0].value:<5} | Conv: {row.metric_values[2].value}")

        print("\n--- RÉSULTATS DES PAGES (Top 10) ---")
        for row in pages_resp.rows[:10]:
            path = row.dimension_values[0].value
            sessions = row.metric_values[0].value
            rate = float(row.metric_values[1].value) * 100
            dur = float(row.metric_values[2].value)
            conv = row.metric_values[3].value
            print(f"Page: {path:<30} | Sessions: {sessions:<5} | Engagement: {rate:>5.1f}% | Durée: {dur:>5.1f}s | Conv: {conv}")

        print("\n--- RÉPARTITION DES ÉVÉNEMENTS ---")
        for row in events_resp.rows:
            print(f"Event: {row.dimension_values[0].value:<25} | Count: {row.metric_values[0].value}")

    except Exception as e:
        print(f"❌ Erreur lors de l'audit : {e}")

if __name__ == "__main__":
    run_audit()
