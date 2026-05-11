const BASE_URL = "https://e-comm06.vercel.app";

// Products
export async function getProducts() {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();

    return data.result;
}

export async function getFeatured() {
    const res = await fetch(`${BASE_URL}/api/products/featured?page=1&limit=8`);
    const data = await res.json();

    return data.result.items;
}

export async function getBestSellerByCategory() {
    const res = await fetch(`${BASE_URL}/api/products/best-seller?categorySlug=all&page=1&limit=8`);
    const data = await res.json();

    return data.result.items;
}

// Login & register
export async function loginAPI(email, password) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    return data.result;
}

export async function registerAPI(name, email, password) {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    return data.result;
}

export async function getMe() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    const data = await res.json();

    return data.result;
}

// Categories
export async function getCategories() {
    const res = await fetch(`${BASE_URL}/api/categories`);
    const data = await res.json();

    return data.result;
}

// Wishlist 
export async function getWishlist() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/wishlist`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

export async function addWishlist(productId) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/wishlist`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId }),
    })

    return res.json();
}

export async function removeWishlist(productId) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}