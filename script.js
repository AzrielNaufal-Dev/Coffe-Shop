(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    document.documentElement.classList.add("js-motion");
  }

  function initializeInteractions() {
    var menuButton = document.getElementById("menu-btn");
    var mobileMenu = document.getElementById("mobile-menu");

    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", function () {
        var isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        mobileMenu.classList.toggle("hidden", isExpanded);
      });

      mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          menuButton.setAttribute("aria-expanded", "false");
          mobileMenu.classList.add("hidden");
        });
      });
    }

    var revealElements = document.querySelectorAll(".reveal");

    if (prefersReducedMotion || revealElements.length === 0) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInteractions, {
      once: true,
    });
  } else {
    initializeInteractions();
  }
})();
