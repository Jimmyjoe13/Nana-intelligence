/**
 * Nana Intelligence - Main JavaScript
 * Handles: Mobile menu, FAQ accordion, Form submission, Scroll animations
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

      // Update aria-expanded
      burger.setAttribute("aria-expanded", !isOpen);

      // Prevent body scroll when menu is open
      body.classList.toggle("no-scroll", !isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active", "nav-active");
        burger.classList.remove("active", "toggle");
        burger.setAttribute("aria-expanded", "false");
        body.classList.remove("no-scroll");
      });
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        nav.classList.remove("active", "nav-active");
        burger.classList.remove("active", "toggle");
        burger.setAttribute("aria-expanded", "false");
        body.classList.remove("no-scroll");
        burger.focus();
      }
    });
  }

  // =========================================
  // 2. FAQ ACCORDION
  // =========================================
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close all other items (optional - for single open behavior)
        // faqItems.forEach(otherItem => {
        //     if (otherItem !== item) {
        //         otherItem.classList.remove('active');
        //         otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        //     }
        // });

        // Toggle current item
        item.classList.toggle("active");
        question.setAttribute("aria-expanded", !isOpen);
      });

      // Keyboard support
      question.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          question.click();
        }
      });
    }
  });

  // =========================================
  // 3. SMOOTH SCROLL FOR ANCHOR LINKS
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        const headerHeight =
          document.querySelector("header, .header")?.offsetHeight || 0;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

  // =========================================
  // 4. CONTACT FORM (Tally Webhook Format)
  // =========================================
  const WEBHOOK_URL = "https://agent-juliette.onrender.com/webhook/tally";
  
  // Helper: Generate UUID v4
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Helper: Generate short ID (like Tally's responseId)
  function generateShortId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Build Tally-format payload from form data
  function buildTallyPayload(formData) {
    const now = new Date().toISOString();
    const eventId = generateUUID();
    const responseId = generateShortId();
    const respondentId = generateShortId();

    // Service options mapping
    const serviceOptions = [
      { id: "10477feb-78b4-4a5d-96d2-c525b23c9896", text: "Mass Mailing & Lead Gen" },
      { id: "c30f2b45-95ab-4327-a09f-375c18b471d8", text: "Automatisation & IA" },
      { id: "34e6ddc8-54ed-4948-b62e-9bde294056e3", text: "SEO & Growth Hacking" }
    ];

    // Budget options mapping
    const budgetOptions = [
      { id: "5c526960-ed53-4f05-a70e-096956f3f7ef", text: "< 1 000€" },
      { id: "7ccf8026-f040-432d-90f1-ad9f8c982857", text: "1–3k€" },
      { id: "c4443dd7-6e0b-4f9c-a086-d632e77062e5", text: "3–7k€" },
      { id: "b8492354-915d-4d79-8446-411d6e3ee0cf", text: "7–15k€" },
      { id: "03caa44d-4618-40f6-9d3b-5ebb1a07eb16", text: "15k€+" },
      { id: "34c7da66-b3e9-4c92-ba5f-d65dc94c7797", text: "Je ne sais pas" }
    ];

    // Consent option
    const consentOptions = [
      { id: "1d3eb89f-84fe-4b9e-9854-bfd027cd8138", text: "J'accepte d'être recontacté au sujet de ma demande de devis." }
    ];

    // Build fields array
    const fields = [
      {
        key: "question_8KX57P",
        label: "Prénom",
        type: "INPUT_TEXT",
        value: formData.firstname
      },
      {
        key: "question_0xK5Nj",
        label: "Nom",
        type: "INPUT_TEXT",
        value: formData.lastname
      },
      {
        key: "question_zqkvP0",
        label: "Email Pro",
        type: "INPUT_TEXT",
        value: formData.email
      },
      {
        key: "question_5zJ5WE",
        label: "Entreprise",
        type: "INPUT_TEXT",
        value: formData.company || ""
      },
      {
        key: "question_d6OVBK",
        label: "Site Web\n",
        type: "INPUT_TEXT",
        value: formData.website || ""
      },
      {
        key: "question_YQ1yNJ",
        label: "Type de service",
        type: "DROPDOWN",
        value: formData.service ? [formData.service] : [],
        options: serviceOptions
      },
      {
        key: "question_DNjygZ",
        label: "Votre Besoin",
        type: "TEXTAREA",
        value: formData.message
      },
      {
        key: "question_a6RgQv",
        label: "Budget estimé\n",
        type: "DROPDOWN",
        value: formData.budget ? [formData.budget] : [],
        options: budgetOptions
      },
      {
        key: "question_67gy8P",
        label: "Consentement\n",
        type: "CHECKBOXES",
        value: formData.consent ? ["1d3eb89f-84fe-4b9e-9854-bfd027cd8138"] : [],
        options: consentOptions
      },
      {
        key: "question_67gy8P_1d3eb89f-84fe-4b9e-9854-bfd027cd8138",
        label: "Consentement\n (J'accepte d'être recontacté au sujet de ma demande de devis.)",
        type: "CHECKBOXES",
        value: formData.consent ? true : false
      }
    ];

    return {
      eventId: eventId,
      eventType: "FORM_RESPONSE",
      createdAt: now,
      data: {
        responseId: responseId,
        submissionId: responseId,
        respondentId: respondentId,
        formId: "yPY9Bx",
        formName: "Demande de devis",
        createdAt: now.replace('.000Z', '.000Z').slice(0, -5) + '.000Z',
        fields: fields
      }
    };
  }

  // Send to webhook
  async function sendToTallyWebhook(payload) {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Nana-Intelligence-Website"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Check honeypot (anti-spam)
      const honeypot = contactForm.querySelector('[name="honeypot"]');
      if (honeypot && honeypot.value) {
        console.log("Spam detected");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      // Loading state
      submitBtn.innerText = "Envoi en cours...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      // Collect form data
      const formData = {
        firstname: contactForm.querySelector('#firstname').value.trim(),
        lastname: contactForm.querySelector('#lastname').value.trim(),
        email: contactForm.querySelector('#email').value.trim(),
        company: contactForm.querySelector('#company').value.trim(),
        website: contactForm.querySelector('#website').value.trim(),
        service: contactForm.querySelector('#service').value,
        message: contactForm.querySelector('#message').value.trim(),
        budget: contactForm.querySelector('#budget').value,
        consent: contactForm.querySelector('#consent').checked
      };

      try {
        // Build Tally-format payload
        const payload = buildTallyPayload(formData);
        
        // Send to webhook
        await sendToTallyWebhook(payload);

        // Success
        showFormMessage(
          contactForm,
          "success",
          "Merci ! Votre demande a bien été envoyée. Je reviens vers vous rapidement."
        );
        contactForm.reset();

      } catch (error) {
        console.error("Erreur envoi webhook:", error);
        showFormMessage(
          contactForm,
          "error",
          "Une erreur est survenue. Veuillez réessayer ou me contacter directement par email."
        );
      } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }
    });
  }

  function showFormMessage(form, type, message) {
    let messageEl = form.querySelector(".form-message");

    if (!messageEl) {
      messageEl = document.createElement("div");
      messageEl.className = "form-message";
      form.appendChild(messageEl);
    }

    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    messageEl.style.display = "block";

    // Scroll to message
    messageEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // =========================================
  // 5. SCROLL ANIMATIONS (Intersection Observer)
  // =========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: Stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  };

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    const animatedElements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .scale-in",
    );
    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // If reduced motion is preferred, show all elements immediately
    document
      .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
      .forEach((el) => {
        el.classList.add("visible");
      });
  }

  // =========================================
  // 6. HEADER SCROLL EFFECT (Optional)
  // =========================================
  let lastScrollY = window.scrollY;
  const header = document.querySelector("header, .header");

  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        const currentScrollY = window.scrollY;

        // Add shadow on scroll
        if (currentScrollY > 10) {
          header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
        } else {
          header.style.boxShadow = "none";
        }

        lastScrollY = currentScrollY;
      },
      { passive: true },
    );
  }

  // =========================================
  // 7. CURRENT YEAR IN FOOTER
  // =========================================
  const yearElements = document.querySelectorAll("[data-year]");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
});
