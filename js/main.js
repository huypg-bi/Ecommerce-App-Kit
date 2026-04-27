import { renderProducts } from "./products.js";
import { initAuth } from "./auth.js";

document.addEventListener("DOMContentLoaded", async () => {
    await initAuth();
    await renderProducts();
});