import { getProducts } from "./api.js";

let currentProduct = null;
let selectedColor = null;

document.addEventListener("DOMContentLoaded", async () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        console.error("Product ID not found in URL");
        window.location.href = "../index.html";
        return;
    }

    // Fetch and render product
    await renderProductDetail(productId);

    // Setup event listeners
    setupEventListeners();
});

async function renderProductDetail(productId) {
    try {
        const products = await getProducts();
        const product = products.find(p => p._id === productId);

        if (!product) {
            console.error("Product not found");
            window.location.href = "../index.html";
            return;
        }

        currentProduct = product;

        // Update breadcrumb
        document.getElementById("category-link").textContent = product.categorySlug || "Product";
        document.getElementById("product-name").textContent = product.name;

        // Update product header
        document.getElementById("product-title").textContent = product.name;
        document.getElementById("product-rating").textContent = "★★★★☆";
        document.getElementById("product-description").textContent = product.description || "No description available";

        // Update product images
        updateProductImages(product);

        // Update price
        const discountPercent = 24; // Example discount
        document.getElementById("new-price").textContent = `$${(product.price || 299.43).toFixed(2)}`;
        document.getElementById("old-price").textContent = `$${(product.price * 1.5).toFixed(2)}`;
        document.getElementById("discount-badge").textContent = `${discountPercent}% Off`;

        // Update availability
        document.getElementById("availability").textContent = product.stock ? "In Stock" : "Out of Stock";
        document.getElementById("product-category").textContent = product.category || "Accessories";

        // Setup color options
        setupColorOptions();

        // Load related products
        loadRelatedProducts(product, products);

        // Load best seller product
        loadBestSellerProduct(products);

    } catch (error) {
        console.error("Error loading product:", error);
    }
}

function updateProductImages(product) {
    const mainImage = document.getElementById("main-image");
    mainImage.src = product.image;

    const thumbnailContainer = document.getElementById("thumbnail-images");
    
    // Generate multiple thumbnail images (using same image for demo)
    const images = [product.image, product.image, product.image, product.image];
    
    thumbnailContainer.innerHTML = images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${img}" alt="Product thumbnail ${index + 1}">
        </div>
    `).join("");

    // Add click listeners to thumbnails
    document.querySelectorAll(".thumbnail").forEach(thumb => {
        thumb.addEventListener("click", (e) => {
            document.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("active"));
            e.currentTarget.classList.add("active");
            mainImage.src = images[parseInt(e.currentTarget.dataset.index)];
        });
    });
}

function setupColorOptions() {
    const colors = ["#1D3B5F", "#E74C3C", "#1C1C1C", "#FFD700"];
    const colorContainer = document.getElementById("color-options");

    colorContainer.innerHTML = colors.map((color, index) => `
        <div class="color-option" style="background-color: ${color}" data-color="${color}" title="${color}"></div>
    `).join("");

    // Set first color as selected
    document.querySelectorAll(".color-option").forEach((colorBtn, index) => {
        if (index === 0) {
            colorBtn.classList.add("active");
            selectedColor = colorBtn.dataset.color;
        }

        colorBtn.addEventListener("click", (e) => {
            document.querySelectorAll(".color-option").forEach(btn => btn.classList.remove("active"));
            e.currentTarget.classList.add("active");
            selectedColor = e.currentTarget.dataset.color;
        });
    });
}

function setupEventListeners() {
    // Quantity controls
    const qtyInput = document.getElementById("quantity");
    const qtyMinus = document.getElementById("qty-minus");
    const qtyPlus = document.getElementById("qty-plus");

    qtyMinus.addEventListener("click", () => {
        let qty = parseInt(qtyInput.value);
        if (qty > 1) {
            qtyInput.value = qty - 1;
        }
    });

    qtyPlus.addEventListener("click", () => {
        let qty = parseInt(qtyInput.value);
        qtyInput.value = qty + 1;
    });

    // Add to cart
    document.getElementById("add-to-cart").addEventListener("click", () => {
        const quantity = parseInt(document.getElementById("quantity").value);
        const size = document.getElementById("size-select").value;

        if (!size) {
            alert("Please select a size");
            return;
        }

        // Save to localStorage (cart system)
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItem = {
            id: currentProduct._id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: quantity,
            size: size,
            color: selectedColor
        };

        // Check if item already in cart
        const existingItem = cart.find(item => 
            item.id === cartItem.id && item.size === size && item.color === selectedColor
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");

        // Reset quantity
        document.getElementById("quantity").value = 1;
    });

    // Add to wishlist
    document.getElementById("add-to-wishlist").addEventListener("click", (e) => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const wishlistBtn = e.currentTarget;

        const existingItem = wishlist.find(item => item._id === currentProduct._id);

        if (existingItem) {
            // Remove from wishlist
            const index = wishlist.indexOf(existingItem);
            wishlist.splice(index, 1);
            wishlistBtn.classList.remove("active");
            alert("Removed from wishlist");
        } else {
            // Add to wishlist
            wishlist.push(currentProduct);
            wishlistBtn.classList.add("active");
            alert("Added to wishlist!");
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });

    // Share buttons
    document.querySelector(".btn-share.facebook").addEventListener("click", () => {
        const url = window.location.href;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, "_blank", "width=600,height=400");
    });

    document.querySelector(".btn-share.twitter").addEventListener("click", () => {
        const url = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check%20out%20this%20product!`;
        window.open(twitterUrl, "_blank", "width=600,height=400");
    });

    // Tab switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const tabName = e.currentTarget.dataset.tab;
            
            // Remove active class from all buttons and contents
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

            // Add active class to clicked button and corresponding content
            e.currentTarget.classList.add("active");
            document.getElementById(tabName).classList.add("active");
        });
    });
}

function loadRelatedProducts(currentProduct, allProducts) {
    const relatedContainer = document.getElementById("related-products");
    
    // Get products from same category (exclude current product)
    const related = allProducts
        .filter(p => p.category === currentProduct.category && p._id !== currentProduct._id)
        .slice(0, 4);

    if (related.length === 0) {
        // If no related products from same category, show random products
        const random = allProducts
            .filter(p => p._id !== currentProduct._id)
            .slice(0, 4);
        renderRelatedProducts(random, relatedContainer);
    } else {
        renderRelatedProducts(related, relatedContainer);
    }
}

function loadBestSellerProduct(allProducts) {
    // Get a random best seller product (exclude current product)
    const bestSellers = allProducts.filter(p => p._id !== currentProduct._id && p.stock);
    
    if (bestSellers.length === 0) {
        document.getElementById("best-seller-box").style.display = "none";
        return;
    }

    const randomIndex = Math.floor(Math.random() * bestSellers.length);
    const bestSeller = bestSellers[randomIndex];

    const bsProductContainer = document.getElementById("bs-product");

    bsProductContainer.innerHTML = `
        <div class="bs-image">
            <span class="bs-badge">HOT</span>
            <img src="${bestSeller.image}" alt="${bestSeller.name}">
        </div>
        <div class="bs-info">
            <h4>${bestSeller.name}</h4>
            <div class="bs-rating">★★★★☆</div>
            <div class="bs-price">
                <span class="new">$${(bestSeller.price || 299.43).toFixed(2)}</span>
                <span class="old">$${(bestSeller.price * 1.5 || 534.33).toFixed(2)}</span>
            </div>
        </div>
    `;

    // Add click event to navigate to best seller product
    bsProductContainer.addEventListener("click", () => {
        window.location.href = `product-detail.html?id=${bestSeller._id}`;
    });
}

function renderRelatedProducts(products, container) {
    container.innerHTML = products.map(product => `
        <div class="related-product-card" onclick="window.location.href='product-detail.html?id=${product._id}'">
            <div class="related-product-image">
                ${product.stock ? '<span class="related-product-badge">HOT</span>' : ''}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="related-product-info">
                <h4>${product.name}</h4>
                <div class="related-product-rating">★★★★☆</div>
                <div class="related-product-price">
                    <span class="new">$${(product.price || 299.43).toFixed(2)}</span>
                    <span class="old">$${(product.price * 1.5 || 534.33).toFixed(2)}</span>
                    <span class="discount">24% Off</span>
                </div>
            </div>
        </div>
    `).join("");
}
