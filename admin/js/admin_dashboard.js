import { logout } from "../../js/auth.js";
import { renderCategory } from "./admin_category.js";
import { renderProduct } from "./admin_products.js";

// Logout handler - Dùng hàm logout từ auth.js
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        logout("../../pages/login.html");
    });
}

const content = document.querySelector(".admin-content");

// Chỉ lắng nghe click trên <a> tags (loại trừ <p> Dashboard)
document.querySelectorAll("a.nav-item").forEach(item => {
    item.addEventListener("click", async (e) => {
        e.preventDefault();

        const page = item.dataset.page;

        if (page === "products") {
            renderProduct();
        } else if (page === "categories") {
            renderCategory();
        }
    })
})