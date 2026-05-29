import { getCategories } from "../../../js/api.js";

export async function renderCategoryOptions(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option value="">-- Chọn category --</option>`;

    const categories = await getCategories();
    categories.forEach(category => {
        select.innerHTML += `
            <option value="${category._id}">${category.name}</option>
        `;
    });
}