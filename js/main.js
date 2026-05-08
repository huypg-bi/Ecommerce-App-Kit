import { renderProducts } from "./products.js";
import { initAuth } from "./auth.js";
import { renderCategory } from "./categories.js";
import { renderWishlist } from "./renderWishlist.js";
import { renderFeatured } from "./featured.js";

document.addEventListener("DOMContentLoaded", async () => {
    // auth (login/register)
    if (document.querySelector("#login-form") || document.querySelector("#register-form")) {
        initAuth();
    }

    // categories (mega menu)
    renderCategory();

    // products (home page)
    if (document.querySelector(".product-grid")) {
        renderProducts();
    }

    // wishlist page
    if (document.querySelector(".wishlist-container")) {
        renderWishlist();
    }

    // featured (home page)
    if (document.querySelector(".fea-pro")) {
        renderFeatured();
    }
});