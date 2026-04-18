from google.analytics.admin_v1alpha import AnalyticsAdminServiceClient
from google.oauth2 import service_account

CREDENTIALS_PATH = 'analytics-credentials/n8n-ai-agent-451510-878f98de2c6e.json'
PROPERTY_ID = '497677784'

def check_ga4_config():
    try:
        credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
        client = AnalyticsAdminServiceClient(credentials=credentials)
        
        property_path = f"properties/{PROPERTY_ID}"
        
        print(f"--- Analyse de la propriété {PROPERTY_ID} ---")
        
        # 1. Vérifier les Flux de Données
        print("\n1. Flux de données :")
        streams = client.list_data_streams(parent=property_path)
        for stream in streams:
            print(f"- Nom: {stream.display_name}")
            print(f"  ID de mesure: {stream.web_stream_data.measurement_id}")
            print(f"  Type: {stream.type_}")
            
        # 2. Vérifier les Filtres de Données
        print("\n2. Filtres de données :")
        filters = client.list_data_filters(parent=property_path)
        found_filter = False
        for data_filter in filters:
            found_filter = True
            print(f"- Nom: {data_filter.display_name}")
            print(f"  Type: {data_filter.type_}")
            print(f"  État: {data_filter.state}")
            
        if not found_filter:
            print("Aucun filtre de données trouvé.")

    except Exception as e:
        print(f"Erreur lors de l'accès à l'API Admin : {e}")
        print("Note: Le compte de service n'a peut-être pas les droits 'Administrateur' sur GA4.")

if __name__ == "__main__":
    check_ga4_config()
