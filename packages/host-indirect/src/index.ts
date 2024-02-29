import "./style.css";
import { init, loadRemote } from "@module-federation/runtime";

fetch("http://localhost:9000/api/v1/pilet/microfrontends")
  .then((res) => res.json())
  .then(async ({ remotes }) => {
    init({
      name: "host",
      remotes, // array of objects: { name, entry }
    });

    const { renderProductPage }: any = await loadRemote("red/product-page");
    const root = document.querySelector("#app");
    renderProductPage(root);
  });
