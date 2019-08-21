// JS Goes here - ES6 supported

import "./css/main.css";

import Form from "./Form.svelte";

const app = new Form({
  target: document.querySelector("#form"),
});

export default app;
