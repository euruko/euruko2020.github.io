// JS Goes here - ES6 supported

import "./css/main.css";

import Form from "./Form.svelte";

const app = new Form({
  target: document.querySelector("#form"),
});

export default app;

const header = document.getElementById("header");
const heroImage = document.getElementById("hero-image");
const mobileToggle = document.getElementById("mobile-toggle");
const langSelect = document.getElementById("lang-select");

window.addEventListener("load", () => {
  setClickListeners();
  setScrollListener();
  setIntersectionObserver();
}, false);

const setScrollListener = () => {
  if (window.scrollY > 100) {
    header.classList.remove("header--not-scrolled");
  }

  if (window.scrollY < 1000) {
    heroImage.style.cssText = "transform: translateY(" + (window.scrollY * 0.3).toFixed(0) + "px);";
  }

  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 100) {
      header.classList.remove("header--not-scrolled");
    } else {
      header.classList.add("header--not-scrolled");
    }
    if (window.scrollY < 1000) {
      heroImage.style.cssText = "transform: translateY(" + (window.scrollY * 0.3).toFixed(0) + "px);";
    }
  });
};

const setClickListeners = () => {
  mobileToggle.addEventListener("click", (e) => {
    header.classList.toggle("header--mobile-toggled");
  });

  langSelect.addEventListener("click", (e) => {
    header.classList.toggle("header--language-toggled");
  });
};

const setIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
  };

  const observer = new IntersectionObserver(observerCallback, options);

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    const sectionIndex = entry.target.id;
    const sectionHeading = document.getElementById("heading-" + sectionIndex);
    const sectionLink = document.getElementById("link-" + sectionIndex);

    if (entry.isIntersecting) {
      if (sectionHeading) sectionHeading.classList.add("section__heading--active");
      if (sectionLink) sectionLink.classList.add("header__link--active");
    } else {
      if (sectionLink) sectionLink.classList.remove("header__link--active");
    }
  });
};
