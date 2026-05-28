import { renderProducts } from "./products.js";
import { initAuth, logout } from "./auth.js";
import { renderCategory } from "./categories.js";
import { renderWishlist } from "./renderWishlist.js";
import { renderFeatured } from "./featured.js";
import { initUser, getAndSetUserName } from "./user.js";
import { preventAuthPages } from "./auth-guard.js";

document.addEventListener("DOMContentLoaded", async () => {

    preventAuthPages();

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

    // get useName
    if (document.querySelector(".profile")) {
        initUser();
    }

    // Profile dropdown
    const profileDropdown = document.getElementById("profileDropdown");
    const profileName = document.getElementById("profileName");
    const logoutBtn = document.getElementById("logoutBtn");

    if (profileDropdown) {
        getAndSetUserName();

        profileDropdown.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("open");
        });

        document.addEventListener("click", () => {
            profileDropdown.classList.remove("open");
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logout();
        });
    }
});