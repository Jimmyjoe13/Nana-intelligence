document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. GESTION DU MENU MOBILE ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav-links');

    // On vérifie si le menu existe sur la page avant d'agir
    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Basculer la classe qui fait glisser le menu
            nav.classList.toggle('nav-active');
            // Basculer l'animation du bouton (transformer en croix)
            burger.classList.toggle('toggle');
        });
    }

    // --- 2. BOUTON DÉCOUVRIR (Page Accueil) ---
    const discoverBtn = document.getElementById('discover');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function() {
            window.location.href = "services.html";
        });
    }

    // --- 3. FORMULAIRE DE CONTACT ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêche le rechargement de page
            alert('Merci pour votre message ! Nous reviendrons vers vous sous peu.');
            contactForm.reset(); // Vide les champs après envoi
        });
    }

    // --- 4. EFFETS VISUELS ---
    // Effet Parallax sur la bannière Hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            let scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }

    // Effet de zoom sur les items (Carousel)
    const carouselItems = document.querySelectorAll(".carousel-item");
    if (carouselItems.length > 0) {
        carouselItems.forEach(item => {
            item.addEventListener("mouseover", () => {
                item.style.transform = "scale(1.05)";
                item.style.transition = "transform 0.3s ease";
            });
            item.addEventListener("mouseout", () => {
                item.style.transform = "scale(1)";
            });
        });
    }
});