import "./style.css";
import { setup } from "@shared/loader";

fetch("https://module-demo.my.dev.piral.cloud/api/v1/importmap")
  .then((res) => res.json())
  .then(async ({ imports }) => {
    const remotes = Object.entries(imports).map(
      ([name, entry]: [string, string]) => ({ name, entry })
    );

    setup({
      name: "host",
      remotes, // array of objects: { name, entry }
    });

    const { renderProductPage }: any = await window.loadRemote("red/product-page");
    const root = document.querySelector("#app");
    renderProductPage(root);
  });
