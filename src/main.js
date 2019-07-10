import Form from "./Form.svelte";

const app = new Form({
  target: document.querySelector("#form"),
  props: {
    name: "world",
  },
});

export default app;
