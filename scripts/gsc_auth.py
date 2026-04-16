#!/usr/bin/env python3
"""
gsc_auth.py — One-time script to obtain the GSC OAuth2 refresh token.

Usage (run once, locally or on VPS):
  export GSC_CLIENT_ID="your-client-id"
  export GSC_CLIENT_SECRET="your-client-secret"
  python scripts/gsc_auth.py

Then add the printed refresh token as GitHub Secret: GSC_REFRESH_TOKEN
"""

import os
import urllib.parse
import urllib.request
import json


CLIENT_ID = os.environ.get("GSC_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("GSC_CLIENT_SECRET", "")
SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"
REDIRECT_URI = "http://localhost"


def main():
    if not CLIENT_ID or not CLIENT_SECRET:
        print("Set GSC_CLIENT_ID and GSC_CLIENT_SECRET as env vars first.")
        return

    # Step 1 — Build authorization URL
    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": SCOPE,
        "access_type": "offline",
        "prompt": "consent",
    }
    auth_url = "https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode(params)

    print("\n" + "=" * 70)
    print("ETAPE 1 — Ouvre cette URL dans ton navigateur :")
    print("=" * 70)
    print(f"\n{auth_url}\n")
    print("=" * 70)
    print("ETAPE 2 — Apres autorisation, tu seras redirige vers http://localhost")
    print("La page ne chargera PAS (c'est normal).")
    print("Copie l'URL complete de la barre d'adresse.\n")

    # Step 2 — User pastes the full redirect URL
    redirect_url = input("Colle ici l'URL complete de redirection : ").strip()
    parsed = urllib.parse.urlparse(redirect_url)
    code = urllib.parse.parse_qs(parsed.query).get("code", [None])[0]

    if not code:
        print("Code introuvable dans l'URL. Verifi que l'URL contient ?code=...")
        return

    # Step 3 — Exchange code for tokens
    token_data = urllib.parse.urlencode({
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }).encode()

    req = urllib.request.Request(
        "https://oauth2.googleapis.com/token",
        data=token_data,
        method="POST",
    )
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    with urllib.request.urlopen(req) as resp:
        tokens = json.loads(resp.read())

    refresh_token = tokens.get("refresh_token")
    if not refresh_token:
        print("Pas de refresh_token dans la reponse.")
        print(f"Reponse recue : {json.dumps(tokens, indent=2)}")
        return

    print("\n" + "=" * 70)
    print("SUCCES ! Voici ton refresh token :")
    print("=" * 70)
    print(f"\nGSC_REFRESH_TOKEN={refresh_token}\n")
    print("=" * 70)
    print("\nAjoute-le comme secret GitHub :")
    print("  Repo GitHub -> Settings -> Secrets and variables -> Actions -> New secret")
    print("  Name  : GSC_REFRESH_TOKEN")
    print(f"  Value : {refresh_token}")


if __name__ == "__main__":
    main()
