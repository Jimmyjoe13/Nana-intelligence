from google.analytics.admin_v1alpha import AnalyticsAdminServiceClient
from google.oauth2 import service_account

CREDENTIALS_PATH = 'analytics-credentials/n8n-ai-agent-451510-878f98de2c6e.json'
PROPERTY_ID = '497677784'

def fix_and_find_filters():
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    client = AnalyticsAdminServiceClient(credentials=credentials)
    parent = f"properties/{PROPERTY_ID}"

    print(f"--- Recherche approfondie des filtres pour {PROPERTY_ID} ---")
    
    try:
        # Tenter de lister les filtres via list_data_filters
        # Si la méthode directe manque dans dir(), on peut tenter l'appel via metadata
        filters = client.list_data_filters(parent=parent)
        for df in filters:
            print(f"✅ FILTRE TROUVÉ : {df.display_name}")
            print(f"   - Type : {df.type_}")
            print(f"   - État : {df.state} (1=Active, 2=Testing, 3=Inactive)")
            
            if df.state == 1:
                print(f"   🚀 ACTION : Je vais tenter de passer le filtre '{df.display_name}' en mode TEST.")
                df.state = 2 # Mode TEST
                client.update_data_filter(data_filter=df)
                print(f"   ✅ RÉUSSI : Le filtre est maintenant en mode TEST.")
    except Exception as e:
        print(f"Erreur lors de la manipulation des filtres : {e}")

if __name__ == "__main__":
    fix_and_find_filters()
