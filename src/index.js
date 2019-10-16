// JS Goes here - ES6 supported

import "./css/main.css";

import Form from "./Form.svelte";

const app = new Form({
  target: document.querySelector("#form"),
});

export default app;

const header = document.getElementById("header");
const mobileToggle = document.getElementById("mobile-toggle");
const heroImage = document.getElementById("hero-image");
const langSelect = document.getElementById("lang-select");

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 100) {
    header.classList.remove("header--not-scrolled");
  } else {
    header.classList.add("header--not-scrolled");
  }
  heroImage.style.cssText = "transform: translateY(" + (window.scrollY * 0.3).toFixed(0) + "px);";
});

mobileToggle.addEventListener("click", (e) => {
  header.classList.toggle("header--mobile-toggled");
});

langSelect.addEventListener("click", (e) => {
  header.classList.toggle("header--language-toggled");
});
