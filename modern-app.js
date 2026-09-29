document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initScrollReveal();
  initTheme();
  initContactForm();
  initYear();
});

function initNavigation() {
  const header = document.querySelector(".header");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  const navResume = document.querySelector(".nav-resume");

  const onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 12);
    updateActiveNavLink();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenuOpen(isOpen) {
    mobileToggle.classList.toggle("active", isOpen);
    navMenu.classList.toggle("active", isOpen);
    navOverlay.classList.toggle("active", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
    mobileToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    navOverlay.setAttribute("aria-hidden", String(!isOpen));
  }

  mobileToggle.addEventListener("click", function () {
    setMenuOpen(!navMenu.classList.contains("active"));
  });

  navOverlay.addEventListener("click", function () {
    setMenuOpen(false);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  if (navResume) {
    navResume.addEventListener("click", function () {
      setMenuOpen(false);
    });
  }

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      setMenuOpen(false);
    }
  });

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;
    let currentId = "about";

    document.querySelectorAll("main section[id]").forEach(function (section) {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === "#" + currentId);
    });
  }
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach(function (el) {
    if (el.closest("#about")) {
      el.classList.add("revealed");
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      if (!el.classList.contains("revealed")) {
        observer.observe(el);
      }
    });
    return;
  }

  revealElements.forEach(function (el) {
    el.classList.add("revealed");
  });
}

function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "light";

  applyTheme(savedTheme);

  themeToggle.addEventListener("click", function () {
    const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    let isValid = true;

    if (!name.value.trim()) {
      showError(name, "Name is required");
      isValid = false;
    } else {
      clearError(name);
    }

    if (!email.value.trim()) {
      showError(email, "Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, "Enter a valid email");
      isValid = false;
    } else {
      clearError(email);
    }

    if (!subject.value.trim()) {
      showError(subject, "Subject is required");
      isValid = false;
    } else {
      clearError(subject);
    }

    if (!message.value.trim()) {
      showError(message, "Message is required");
      isValid = false;
    } else {
      clearError(message);
    }

    if (!isValid) return;

    const body = [
      message.value.trim(),
      "",
      "—",
      name.value.trim(),
      email.value.trim()
    ].join("\n");

    window.location.href =
      "mailto:amnamubarakk111@gmail.com" +
      "?subject=" + encodeURIComponent(subject.value.trim()) +
      "&body=" + encodeURIComponent(body);

    const success = document.createElement("div");
    success.className = "form-success";
    success.innerHTML =
      "<h3>Opening your email client</h3><p>If nothing appears, email me directly at amnamubarakk111@gmail.com.</p>";
    form.replaceWith(success);
  });
}

function showError(input, message) {
  input.classList.add("error");
  input.setAttribute("aria-invalid", "true");

  const existing = input.parentElement.querySelector(".error-message");
  if (existing) existing.remove();

  const error = document.createElement("p");
  error.className = "error-message";
  error.textContent = message;
  input.parentElement.appendChild(error);
}

function clearError(input) {
  input.classList.remove("error");
  input.removeAttribute("aria-invalid");
  const existing = input.parentElement.querySelector(".error-message");
  if (existing) existing.remove();
}

function initYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}
