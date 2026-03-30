const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar nav a");
const sections = document.querySelectorAll("section[id]");

function updateNavbar() {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 140;
  const pageBottom = window.innerHeight + window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;

  let currentSectionId = "";

  if (pageBottom >= documentHeight - 4) {
    currentSectionId = "contact";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });
  }

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", targetId === currentSectionId);
  });
}

function handleScroll() {
  updateNavbar();
  updateActiveNavLink();
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);
window.addEventListener("resize", handleScroll);