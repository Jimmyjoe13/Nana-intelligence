document.addEventListener("DOMContentLoaded", function() {

    // --- 0. INITIALISATION EMAILJS ---
    // IMPORTANT : Colle ta "Public Key" ci-dessous (ex: "user_xxx...")
    emailjs.init("MjBf_OU0LjfGJ_XMh");

    // --- 1. GESTION DU MENU MOBILE ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav-links');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // --- 2. BOUTON DÉCOUVRIR ---
    const discoverBtn = document.getElementById('discover');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function() {
            window.location.href = "services.html";
        });
    }

    // --- 3. FORMULAIRE DE CONTACT (Via EmailJS) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            // Animation du bouton
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Envoi en cours...";
            submitBtn.disabled = true;

            // Envoi via EmailJS
            // REMPLACE CI-DESSOUS PAR TON SERVICE ID et TEMPLATE ID
            emailjs.sendForm('service_ix9u5ml', 'template_l8wb78c', this)
                .then(function() {
                    // Succès
                    alert('Merci ! Votre message a bien été envoyé. Je reviens vers vous vite.');
                    contactForm.reset();
                }, function(error) {
                    // Erreur
                    console.error('Erreur EmailJS:', error);
                    alert('Une erreur est survenue lors de l\'envoi...');
                })
                .finally(() => {
                    // Remet le bouton à la normale
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // --- 4. EFFETS VISUELS ---
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            let scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }

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