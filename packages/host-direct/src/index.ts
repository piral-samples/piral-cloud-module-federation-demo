import "./style.css";

import("red/product-page").then(({ renderProductPage }) => {
  const root = document.querySelector("#app");
  renderProductPage(root);
});
