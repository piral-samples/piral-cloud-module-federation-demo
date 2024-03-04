import { setup } from "@shared/loader";
import { renderProductPage } from "./product-page";

setup({
  name: "red",
  remotes: [
    {
      name: "blue",
      entry: "http://localhost:2002/remoteEntry.js",
    },
    {
      name: "green",
      entry: "http://localhost:2003/remoteEntry.js",
    },
  ],
});

const app = document.querySelector("#app");
const page = app.appendChild(document.createElement("div"));

renderProductPage(page);
