import { getProducts } from "./api.js";

export async function renderProducts() {
    const products = await getProducts();

    const container = document.querySelector(".product-grid");
    if (!container) return;

    if (!Array.isArray(products)) {
        console.error("Not array:", products);
        return;
    }

    container.innerHTML = products.map(pro => `
                <article class="product-card">

                         <div class="product-image">
                             <span class="badge">HOT</span>
                             <img src="${pro.image}" alt="">

                             <div class="overlay">
                                 <button class="icon-btn">
                                     <img src="assets/svg/hearts.svg" alt="">
                                 </button>

                                 <button class="icon-btn">
                                     <img src="assets/svg/cart_2.svg" alt="">
                                 </button>
                             </div>
                         </div>

                         <div class="product-info">
                             <h3>${pro.name}</h3>

                             <div class="rating">★★★★☆</div>

                             <div class="price">
                                 <span class="new">$299.43</span>
                                <span class="old">$534.33</span>
                                 <span class="discount">24% Off</span>
                             </div>
                         </div>

                     </article>
        `).join("");


}
