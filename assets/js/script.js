document.addEventListener("DOMContentLoaded", function() {

    // --- 0. INITIALISATION EMAILJS ---
    // (Ensure you have your public key here)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("MjBf_OU0LjfGJ_XMh");
    }

    // --- 1. GESTION DU MENU MOBILE ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
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
            submitBtn.style.opacity = "0.7";

            // Envoi via EmailJS
            emailjs.sendForm('service_ix9u5ml', 'template_l8wb78c', this)
                .then(function() {
                    // Succès
                    alert('Merci ! Votre message a bien été envoyé. Je reviens vers vous vite.');
                    contactForm.reset();
                }, function(error) {
                    // Erreur
                    console.error('Erreur EmailJS:', error);
                    alert('Une erreur est survenue lors de l\'envoi. Vérifiez votre connexion ou contactez-moi directement.');
                })
                .finally(() => {
                    // Remet le bouton à la normale
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                });
        });
    }

    // --- 4. ANIMATIONS AU SCROLL (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible? 
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});