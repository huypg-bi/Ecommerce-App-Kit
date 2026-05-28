import { getProducts } from "./api.js";
import { initWishlist } from "./initWishlist.js";

export async function renderProducts() {
    const products = await getProducts();

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
                                     <img src="assets/svg/hearts.svg" alt="">
                                 </button>

                                 <button class="icon-btn" onclick="event.stopPropagation(); window.location.href='pages/product-detail.html?id=${pro._id}'">
                                     <img src="assets/svg/cart_2.svg" alt="">
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

    // Click on card → go to detail (no duplicate with button clicks)
    container.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", (e) => {
            const id = card.dataset.id;
            window.location.href = `pages/product-detail.html?id=${id}`;
        });
    });
}