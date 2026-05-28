import { getCategories } from "./api.js";

export async function renderCategory() {
    const container = document.getElementById("mega-category");

    if (!container) return;

    const categories = await getCategories();

    container.innerHTML += `
        <h4>Category</h4>
        ${categories.map(c => `
            <a href="pages/bestSeller.html?category=${c.slug || c._id}" data-id="${c._id}">${c.name}</a>
        `).join("")}
    `;
}