from google.analytics.admin_v1alpha import AnalyticsAdminServiceClient
from google.oauth2 import service_account

CREDENTIALS_PATH = 'analytics-credentials/n8n-ai-agent-451510-878f98de2c6e.json'
PROPERTY_ID = '497677784'

def diagnostic_ga4():
    try:
        credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
        client = AnalyticsAdminServiceClient(credentials=credentials)
        property_path = f"properties/{PROPERTY_ID}"
        
        print(f"--- Diagnostic Administrateur pour la Propriété {PROPERTY_ID} ---")

        # 1. Vérification des Filtres de Données
        print("\n[1] Vérification des Filtres de Données...")
        try:
            # Note: list_data_filters est bien la méthode en v1alpha
            filters = client.list_data_filters(parent=property_path)
            found = False
            for df in filters:
                found = True
                print(f"✅ Filtre trouvé : '{df.display_name}'")
                print(f"   - Type : {df.type_}")
                print(f"   - État actuel : {df.state}")
                
                if df.state == 1: # 1 = ACTIVE
                    print("   ⚠️  ATTENTION : Ce filtre est ACTIF et bloque peut-être vos données.")
                elif df.state == 2: # 2 = TESTING
                    print("   ℹ️  Ce filtre est en mode TEST (les données devraient remonter).")
            if not found:
                print("ℹ️ Aucun filtre de données trouvé.")
        except Exception as e:
            print(f"❌ Impossible de lister les filtres : {e}")

        # 2. Vérification des Événements de Conversion
        print("\n[2] Vérification des Événements de Conversion...")
        try:
            conversions = client.list_conversion_events(parent=property_path)
            for conv in conversions:
                print(f"✅ Conversion active : {conv.event_name}")
        except Exception as e:
            print(f"❌ Impossible de lister les conversions : {e}")

        # 3. Vérification des paramètres du Flux Web
        print("\n[3] Analyse du Flux Web...")
        streams = client.list_data_streams(parent=property_path)
        for stream in streams:
            print(f"✅ Flux : {stream.display_name} ({stream.web_stream_data.measurement_id})")
            # Vérifier si la mesure améliorée est activée
            print(f"   - Mesure améliorée : {'Activée' if stream.web_stream_data.default_uri else 'N/A'}")

    except Exception as e:
        print(f"💥 Erreur générale de connexion : {e}")

if __name__ == "__main__":
    diagnostic_ga4()
