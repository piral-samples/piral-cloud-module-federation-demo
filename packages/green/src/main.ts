import { setup } from "@shared/loader";
import { renderRecommendations } from "./product-recommendations";

setup();

const app = document.querySelector('#app');
const recommendations = app.appendChild(document.createElement('div'));

renderRecommendations(recommendations);
