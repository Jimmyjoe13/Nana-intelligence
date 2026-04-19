/**
 * Nana Intelligence - Consent Management (GDPR compliant)
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Vérifier si le consentement a déjà été donné
  const consentGiven = localStorage.getItem("cookie_consent");

  if (!consentGiven) {
    showConsentBanner();
  } else if (consentGiven === "accepted") {
    updateGtagConsent(true);
  }

  function showConsentBanner() {
    // Créer l'élément HTML du bandeau
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #1a1a1a;
      color: #fff;
      padding: 24px;
      border-radius: 12px;
      border-left: 4px solid #c5a059;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 500px;
      font-family: 'Inter', sans-serif;
      animation: slideUp 0.5s ease-out;
    `;

    banner.innerHTML = `
      <div style="font-size: 16px; line-height: 1.5;">
        <strong style="color: #c5a059; display: block; margin-bottom: 8px; font-size: 18px;">Respect de votre vie privée</strong>
        Nous utilisons des cookies pour analyser notre trafic et améliorer votre expérience sur Nana Intelligence. Certains sont nécessaires au bon fonctionnement du site.
      </div>
      <div style="display: flex; gap: 12px;">
        <button id="accept-cookies" style="background: #c5a059; color: #1a1a1a; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.3s; flex: 1;">Tout accepter</button>
        <button id="decline-cookies" style="background: transparent; color: #aaa; border: 1px solid #444; padding: 10px 20px; border-radius: 6px; font-weight: 500; cursor: pointer; transition: 0.3s;">Refuser</button>
      </div>
      <style>
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        #accept-cookies:hover { background: #d4b47a; transform: translateY(-2px); }
        #decline-cookies:hover { border-color: #666; color: #fff; }
        @media (max-width: 600px) { #cookie-banner { bottom: 10px; left: 10px; right: 10px; } }
      </style>
    `;

    document.body.appendChild(banner);

    // Événements
    document.getElementById("accept-cookies").addEventListener("click", () => {
      localStorage.setItem("cookie_consent", "accepted");
      updateGtagConsent(true);
      banner.remove();
    });

    document.getElementById("decline-cookies").addEventListener("click", () => {
      localStorage.setItem("cookie_consent", "declined");
      updateGtagConsent(false);
      banner.remove();
    });
  }

  function updateGtagConsent(isAccepted) {
    if (typeof gtag === 'function') {
      const status = isAccepted ? 'granted' : 'denied';
      gtag('consent', 'update', {
        'ad_storage': status,
        'analytics_storage': status,
        'ad_user_data': status,
        'ad_personalization': status
      });
      console.log(`✅ Consentement mis à jour : ${status}`);
    }
  }
});
