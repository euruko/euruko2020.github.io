// JS Goes here - ES6 supported

import "./css/main.css";

import Form from "./Form.svelte";

const app = new Form({
  target: document.querySelector("#form"),
});

export default app;

window.addEventListener("load", () => {
  setClickListeners();
  setScrollListener();
  setIntersectionObserver();
}, false);

const setScrollListener = () => {
  const header = document.getElementById("header");
  const heroImage = document.getElementById("hero-image");

  if (header && window.scrollY > 100) {
    header.classList.remove("header--not-scrolled");
  }

  if (heroImage && window.scrollY < 1600) {
    heroImage.style.cssText = "transform: translateY(" + (window.scrollY * 0.3).toFixed(0) + "px);";
  }

  window.addEventListener("scroll", (e) => {
    if (header && window.scrollY > 100) {
      header.classList.remove("header--not-scrolled");
    } else {
      header.classList.add("header--not-scrolled");
    }
    if (heroImage && window.scrollY < 1600) {
      heroImage.style.cssText = "transform: translateY(" + (window.scrollY * 0.3).toFixed(0) + "px);";
    }
  });
};

const setClickListeners = () => {
  const mobileToggle = document.getElementById("mobile-toggle");
  const langSelect = document.getElementById("lang-select");
  const continueButton = document.getElementById("continue-button");
  const firstSection = document.querySelector(".section");
  const header = document.getElementById("header");

  mobileToggle.addEventListener("click", (e) => {
    header.classList.toggle("header--mobile-toggled");
  });

  langSelect.addEventListener("click", (e) => {
    header.classList.toggle("header--language-toggled");
  });

  continueButton.addEventListener("click", (e) => {
    firstSection.scrollIntoView({
      behavior: "smooth"
    });
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
