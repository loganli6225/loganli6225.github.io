const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar nav a");
const sections = document.querySelectorAll("section[id]");
const revealSections = document.querySelectorAll(".reveal-section");
const revealItems = document.querySelectorAll(".reveal-item");

function updateNavbar() {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function getCurrentSection() {
  const scrollPosition = window.scrollY + 140;
  const pageBottom = window.innerHeight + window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;

  let currentSection = null;

  if (pageBottom >= documentHeight - 4) {
    currentSection = document.getElementById("contact");
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section;
      }
    });
  }

  return currentSection;
}

function updateActiveNavLink() {
  const currentSection = getCurrentSection();
  const currentSectionId = currentSection ? currentSection.getAttribute("id") : "";

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", targetId === currentSectionId);
  });
}

function updateNavbarTheme() {
  const currentSection = getCurrentSection();

  if (!currentSection) {
    navbar.classList.remove("on-light");
    return;
  }

  const isLightSection = currentSection.classList.contains("section-light");
  navbar.classList.toggle("on-light", isLightSection && window.scrollY > 10);
}

function handleScroll() {
  updateNavbar();
  updateActiveNavLink();
  updateNavbarTheme();
}

function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target.classList.contains("reveal-section")) {
          entry.target.classList.add("reveal-visible");
        } else {
          entry.target.classList.add("reveal-visible");
        }

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealSections.forEach((section) => observer.observe(section));
  revealItems.forEach((item) => observer.observe(item));
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
    initRevealObserver();
    handleScroll();
  });
});