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
  // 4. CONTACT FORM (EmailJS)
  // =========================================
  // Initialize EmailJS if available
  if (typeof emailjs !== "undefined") {
    emailjs.init("MjBf_OU0LjfGJ_XMh");
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Check honeypot (anti-spam)
      const honeypot = contactForm.querySelector('[name="website"]');
      if (honeypot && honeypot.value) {
        console.log("Spam detected");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      const formMessage = contactForm.querySelector(".form-message");

      // Loading state
      submitBtn.innerText = "Envoi en cours...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      // Hide previous message
      if (formMessage) {
        formMessage.style.display = "none";
      }

      // Send via EmailJS
      if (typeof emailjs !== "undefined") {
        emailjs
          .sendForm("service_ix9u5ml", "template_l8wb78c", this)
          .then(
            function () {
              // Success
              showFormMessage(
                contactForm,
                "success",
                "Merci ! Votre message a bien été envoyé. Je reviens vers vous rapidement.",
              );
              contactForm.reset();
            },
            function (error) {
              // Error
              console.error("Erreur EmailJS:", error);
              showFormMessage(
                contactForm,
                "error",
                "Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.",
              );
            },
          )
          .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
          });
      } else {
        // Fallback if EmailJS not loaded
        showFormMessage(
          contactForm,
          "error",
          "Le service de messagerie n'est pas disponible. Veuillez me contacter directement par email.",
        );
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
