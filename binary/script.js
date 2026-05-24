(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");
  const yearEl = document.getElementById("year");
  const modal = document.getElementById("demo-modal");
  const modalFeature = document.getElementById("demo-modal-feature");
  const demoButtons = document.querySelectorAll("[data-demo]");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function closeMobileNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "মেনু খুলুন");
  }

  function openMobileNav() {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "মেনু বন্ধ করুন");
  }

  function openDemoModal(featureName) {
    if (!modal || !modalFeature) return;
    modalFeature.textContent = "«" + featureName + "»";
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeDemoModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  demoButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const feature = btn.getAttribute("data-demo") || "এই ফিচার";
      openDemoModal(feature);
      closeMobileNav();
    });
  });

  if (modal) {
    modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
      el.addEventListener("click", closeDemoModal);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (modal && !modal.hidden) {
      closeDemoModal();
      return;
    }
    closeMobileNav();
  });

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMobileNav();
      }
    });
  }
})();
