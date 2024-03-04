import { setup } from "@shared/loader";
import "./style.css";

setup({
  name: "host",
  remotes: [
    {
      name: "red",
      entry: "http://localhost:2001/remoteEntry.js",
    },
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

window.loadRemote("red/product-page").then(({ renderProductPage }) => {
  const root = document.querySelector("#app");
  renderProductPage(root);
});
