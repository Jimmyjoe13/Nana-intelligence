from google.analytics.admin_v1alpha import AnalyticsAdminServiceClient
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Metric, Dimension, RunReportRequest
from google.oauth2 import service_account

CREDENTIALS_PATH = 'analytics-credentials/n8n-ai-agent-451510-878f98de2c6e.json'
PROPERTY_ID = '497677784'

def check_everything():
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    admin_client = AnalyticsAdminServiceClient(credentials=credentials)
    data_client = BetaAnalyticsDataClient(credentials=credentials)
    
    property_path = f"properties/{PROPERTY_ID}"
    
    print("--- 1. Recherche de la fonction des filtres ---")
    methods = [m for m in dir(admin_client) if 'filter' in m.lower()]
    print(f"Méthodes de filtrage trouvées : {methods}")
    
    # Tenter la méthode probable si elle existe
    if 'list_data_filters' in methods:
        try:
            filters = admin_client.list_data_filters(parent=property_path)
            for df in filters:
                print(f"✅ Filtre : {df.display_name} | État : {df.state}")
        except Exception as e:
            print(f"Erreur filtres : {e}")

    print("\n--- 2. Vérification des données reçues AUJOURD'HUI ---")
    request = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="eventName")],
        metrics=[Metric(name="eventCount")],
        date_ranges=[DateRange(start_date="today", end_date="today")],
    )
    
    try:
        response = data_client.run_report(request)
        if not response.rows:
            print("❌ AUCUNE donnée reçue aujourd'hui par Google Analytics.")
        else:
            print("✅ Données reçues aujourd'hui :")
            for row in response.rows:
                print(f"- {row.dimension_values[0].value} : {row.metric_values[0].value} fois")
    except Exception as e:
        print(f"Erreur rapport : {e}")

if __name__ == "__main__":
    check_everything()
