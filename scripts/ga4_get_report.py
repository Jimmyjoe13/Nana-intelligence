from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
)
from google.oauth2 import service_account
import os

# Configuration
CREDENTIALS_PATH = 'analytics-credentials/n8n-ai-agent-451510-878f98de2c6e.json'
PROPERTY_ID = '497677784' # Note: Juste le numéro pour la Data API

def get_basic_report():
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    client = BetaAnalyticsDataClient(credentials=credentials)

    print(f"--- Extraction du rapport GA4 pour la propriété {PROPERTY_ID} ---")

    # Requête pour les métriques de base
    request = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="date")],
        metrics=[
            Metric(name="activeUsers"),
            Metric(name="sessions"),
            Metric(name="screenPageViews"),
            Metric(name="conversions"),
            Metric(name="eventCount")
        ],
        date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
    )

    try:
        response = client.run_report(request)
        
        report_md = f"# Rapport de Performance Google Analytics - Nana Intelligence\n\n"
        report_md += f"Période : 7 derniers jours (incluant aujourd'hui)\n\n"
        
        if not response.rows:
            report_md += "⚠️ **Aucune donnée détectée pour le moment.**\n"
            report_md += "C'est normal si le code vient d'être installé. Revenez consulter ce rapport demain.\n"
        else:
            report_md += "| Date | Utilisateurs Actifs | Sessions | Vues de Pages | Conversions | Événements |\n"
            report_md += "| :--- | :---: | :---: | :---: | :---: | :---: |\n"
            
            total_users = 0
            total_sessions = 0
            total_conversions = 0
            
            for row in response.rows:
                date_str = row.dimension_values[0].value
                # Formatage date YYYYMMDD -> YYYY-MM-DD
                formatted_date = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:]}"
                
                users = row.metric_values[0].value
                sessions = row.metric_values[1].value
                views = row.metric_values[2].value
                conversions = row.metric_values[3].value
                events = row.metric_values[4].value
                
                report_md += f"| {formatted_date} | {users} | {sessions} | {views} | {conversions} | {events} |\n"
                
                total_users += int(users)
                total_sessions += int(sessions)
                total_conversions += int(conversions)

            report_md += f"\n\n**Total sur la période :**\n"
            report_md += f"- Utilisateurs cumulés : **{total_users}**\n"
            report_md += f"- Sessions totales : **{total_sessions}**\n"
            report_md += f"- Conversions (Leads) : **{total_conversions}**\n"

        # Sauvegarder le rapport
        os.makedirs('reports', exist_ok=True)
        report_path = 'reports/GA4-Performance-Hebdo.md'
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report_md)
        
        print(f"✅ Rapport généré : {report_path}")
        return report_md

    except Exception as e:
        print(f"❌ Erreur lors de l'extraction : {e}")
        return None

if __name__ == "__main__":
    get_basic_report()
