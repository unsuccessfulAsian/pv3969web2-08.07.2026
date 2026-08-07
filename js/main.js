document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const expanded = navLinks.classList.contains("open");
      navToggle.setAttribute("aria-expanded", String(expanded));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  const form = document.querySelector(".contact-form");
  if (form) {
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;

      form.querySelectorAll("[required]").forEach((field) => {
        const errorEl = field.parentElement.querySelector(".form-error");
        let message = "";

        if (!field.value.trim()) {
          message = "This field is required.";
        } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          message = "Please enter a valid email address.";
        } else if (field.type === "tel" && field.value.trim() && !/^[0-9()+\-.\s]{7,}$/.test(field.value)) {
          message = "Please enter a valid phone number.";
        }

        if (message) {
          valid = false;
        }
        if (errorEl) {
          errorEl.textContent = message;
        }
      });

      if (status) {
        status.textContent = valid
          ? "Thanks for reaching out! We'll get back to you soon."
          : "Please fix the errors above and try again.";
        status.style.color = valid ? "#2e6b3e" : "";
      }

      if (valid) {
        form.reset();
      }
    });
  }
});
