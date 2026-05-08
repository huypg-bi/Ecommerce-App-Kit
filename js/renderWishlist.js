import { getWishlist } from "./api.js";

export async function renderWishlist() {
    const container = document.querySelector(".wishlist-container");
    if (!container) return;

    const data = await getWishlist();
     const wishlist = (data?.result?.products || [])
        .filter(item => item?.product);

    container.innerHTML = wishlist.map(item => `
        <div class="product-card">
            <img src="${item.product.image}" />
            <h3>${item.product.name}</h3>
        </div>
    `).join("");
}