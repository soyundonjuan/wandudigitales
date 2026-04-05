const revealElements = document.querySelectorAll("[data-reveal]");
const siteHeader = document.querySelector(".site-header");
const heroNodes = document.querySelectorAll(".hero-node");
const backToTopButton = document.querySelector(".floating-action--top");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav a");

if (siteHeader) {
  const syncHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);

    if (backToTopButton) {
      backToTopButton.classList.toggle("is-visible", window.scrollY > 320);
    }
  };

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
}

if (siteHeader && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.classList.contains("menu-open")) return;

    const target = event.target;

    if (
      target instanceof Node &&
      !siteHeader.contains(target)
    ) {
      siteHeader.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
    }
  });
}

if (revealElements.length > 0) {
  revealElements.forEach((element) => {
    const delay = element.dataset.delay;

    if (delay) {
      element.style.setProperty("--reveal-delay", `${delay}ms`);
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }
}

if (heroNodes.length > 0) {
  window.setInterval(() => {
    const randomNode = heroNodes[Math.floor(Math.random() * heroNodes.length)];

    randomNode.classList.add("is-active");

    window.setTimeout(() => {
      randomNode.classList.remove("is-active");
    }, 2000);
  }, 1000);
}
