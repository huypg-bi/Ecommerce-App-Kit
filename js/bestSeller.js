import { getBestSellerByCategory } from "./api.js";
import { removeWishlist } from "./api.js";
import { initWishlist } from "./initWishlist.js";
import { renderCategory } from "./categories.js";

export async function renderBestSeller() {
    const products = await getBestSellerByCategory();

    const container = document.querySelector(".product-grid");

    if (!Array.isArray(products)) {
        console.error("Not array:", products);
        return;
    }

    container.innerHTML = products.map(pro => `
                    <article class="product-card" data-id="${pro._id}">

                         <div class="product-image">
                             <span class="badge">HOT</span>
                             <img src="${pro.image}" alt="">

                             <div class="overlay">
                                 <button class="icon-btn wishlist-btn" data-id="${pro._id}" onclick="event.stopPropagation()">
                                     <img src="../assets/svg/hearts.svg" alt="">
                                 </button>

                                 <button class="icon-btn" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${pro._id}'">
                                     <img src="../assets/svg/cart_2.svg" alt="">
                                 </button>
                             </div>
                         </div>

                         <div class="product-info">
                             <h3>${pro.name}</h3>

                             <div class="rating">★★★★☆</div>

                             <div class="price">
                                 <span class="new">$${pro.price}</span>
                                <span class="old">$${pro.originalPrice}</span>
                                 <span class="discount">24% Off</span>
                             </div>
                         </div>

                     </article>
        `).join("");

    initWishlist();

    container.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", (e) => {
            const id = card.dataset.id;
            window.location.href = `product-detail.html?id=${id}`;
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    // categories (mega menu)
    renderCategory();

    // best seller products
    if (document.querySelector(".product-grid")) {
        renderBestSeller();
    }
});
