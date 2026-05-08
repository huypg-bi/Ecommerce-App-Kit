import { getFeatured } from "./api.js";

export async function renderFeatured() {
    const container = document.querySelector(".fea-pro");

    const featured = await getFeatured();

    if (!Array.isArray(featured)) {
        console.error("Featured data is not an array");
        return;
    }

    container.innerHTML += featured.map(fea => `
        <div class="pro-in4" onclick="window.location.href='pages/product-detail.html?id=${fea._id}'">
            <img src="${fea.image}" alt="${fea.name}">

            <div>
                <p>${fea.name}</p>
                <div class="rating">★★★★☆</div>
                <div class="cost">
                    <div class="cost1">$${fea.price}</div>
                    <div class="cost2">$${fea.originalPrice}</div>
                </div>
            </div>
        </div>
    `).join("");
}
