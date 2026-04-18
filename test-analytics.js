const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('--- Démarrage du test Analytics sur nana-intelligence.fr ---');

  // Intercepter les requêtes réseau
  page.on('request', request => {
    const url = request.url();
    if (url.includes('google-analytics.com/g/collect')) {
      console.log('✅ REQUÊTE GA4 DÉTECTÉE :', url.substring(0, 150) + '...');
      if (url.includes('en=cta_click')) {
        console.log('🎯 ÉVÉNEMENT cta_click TROUVÉ DANS LA REQUÊTE !');
      }
      if (url.includes('en=page_view')) {
        console.log('📄 ÉVÉNEMENT page_view TROUVÉ DANS LA REQUÊTE !');
      }
    }
  });

  try {
    console.log('Navigation vers le site...');
    await page.goto('https://nana-intelligence.fr/', { waitUntil: 'networkidle' });

    console.log('Recherche du bouton "Démarrer mon projet"...');
    const button = page.locator('text="Démarrer mon projet"').first();
    
    if (await button.isVisible()) {
      console.log('Bouton trouvé. Clic...');
      await button.click();
      // Attendre un peu pour laisser l'événement partir (beacon)
      await page.waitForTimeout(3000);
    } else {
      console.log('❌ Bouton "Démarrer mon projet" non trouvé sur la page.');
    }

  } catch (err) {
    console.error('❌ Erreur pendant le test :', err.message);
  }

  await browser.close();
  console.log('--- Fin du test ---');
})();
