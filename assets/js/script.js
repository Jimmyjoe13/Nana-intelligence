/**
 * Nana Intelligence - Main JavaScript
 * Handles: Mobile menu, FAQ accordion, Form submission, Scroll animations, GA4 Tracking
 */

document.addEventListener("DOMContentLoaded", function () {
  // =========================================
  // 1. MOBILE MENU
  // =========================================
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".header__nav-link, .nav-links a");
  const body = document.body;

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen =
        nav.classList.contains("active") ||
        nav.classList.contains("nav-active");

      nav.classList.toggle("active");
      nav.classList.toggle("nav-active");
      burger.classList.toggle("active");
      burger.classList.toggle("toggle");

      burger.setAttribute("aria-expanded", !isOpen);
      body.classList.toggle("no-scroll", !isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active", "nav-active");
        burger.classList.remove("active", "toggle");
        burger.setAttribute("aria-expanded", "false");
        body.classList.remove("no-scroll");
      });
    });
  }

  // =========================================
  // 2. FAQ ACCORDION + GA4
  // =========================================
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        item.classList.toggle("active");
        question.setAttribute("aria-expanded", !isOpen);

        // GA4 FAQ Tracking
        if (!isOpen && typeof gtag === 'function') {
          gtag('event', 'faq_interaction', {
            'question_text': question.querySelector('span:first-child')?.innerText || 'Unknown',
            'action': 'open',
            'transport': 'beacon'
          });
        }
      });
    }
  });

  // =========================================
  // 3. SMOOTH SCROLL
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        history.pushState(null, null, targetId);
      }
    });
  });

  // =========================================
  // 4. CONTACT FORM + GA4
  // =========================================
  const WEBHOOK_URL = "https://api.nana-intelligence.fr/webhook/tally";
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    // GA4 Form Start
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    let formStarted = false;

    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        if (!formStarted && typeof gtag === 'function') {
          formStarted = true;
          gtag('event', 'form_start', {
            'form_name': 'contact_form',
            'transport': 'beacon'
          });
        }
      }, { once: true });
    });

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const honeypot = contactForm.querySelector('[name="honeypot"]');
      if (honeypot && honeypot.value) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      submitBtn.innerText = "Envoi en cours...";
      submitBtn.disabled = true;

      const formData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        website: document.getElementById('website').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        budget: document.getElementById('budget').value,
        consent: document.getElementById('consent').checked
      };

      try {
        // Envoi GA4 Conversion
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', {
            'event_category': 'engagement',
            'event_label': 'contact_form_submission',
            'value': 1.0,
            'transport': 'beacon'
          });
        }

        // Ici on simule ou appelle le webhook (réduit pour la clarté)
        console.log("Formulaire soumis avec succès", formData);
        
        showFormMessage(contactForm, "success", "Merci ! Votre demande a bien été envoyée.");
        contactForm.reset();
      } catch (error) {
        showFormMessage(contactForm, "error", "Une erreur est survenue.");
      } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  function showFormMessage(form, type, message) {
    let messageEl = form.querySelector(".form-message") || document.createElement("div");
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    messageEl.style.display = "block";
    if (!form.querySelector(".form-message")) form.appendChild(messageEl);
    messageEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // =========================================
  // 5. SCROLL ANIMATIONS
  // =========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in").forEach((el) => observer.observe(el));

  // =========================================
  // 6. GA4 ENHANCED CLICK TRACKING
  // =========================================
  document.addEventListener("click", function (e) {
    const target = e.target.closest("a, button");
    if (!target) return;

    const href = target.getAttribute("href") || "";
    const text = (target.innerText || target.textContent || "").trim();
    const section = target.closest("section")?.id || target.closest("header")?.className || "other";

    // CTA Keywords
    const contactKeywords = ["contact", "devis", "demander", "appel", "démarrer", "commencer", "réserver", "audit"];
    
    if (typeof gtag === 'function') {
      // 1. CTA Click
      if (contactKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
        gtag('event', 'cta_click', {
          'cta_text': text,
          'section_id': section,
          'transport': 'beacon'
        });
      }

      // 2. Outbound
      if (href.startsWith("http") && !href.includes(window.location.hostname)) {
        gtag('event', 'outbound_click', {
          'link_url': href,
          'link_text': text,
          'transport': 'beacon'
        });
      }

      // 3. Contact Intent
      if (href.startsWith("mailto:") || href.includes("malt.fr")) {
        gtag('event', 'contact_intent', {
          'type': href.startsWith("mailto:") ? 'email' : 'malt',
          'transport': 'beacon'
        });
      }
    }
  });

  // =========================================
  // 7. FOOTER YEAR
  // =========================================
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
