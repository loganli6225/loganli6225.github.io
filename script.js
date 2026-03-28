const navbar = document.getElementById("navbar");

function updateNavbar() {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar);
window.addEventListener("load", updateNavbar);