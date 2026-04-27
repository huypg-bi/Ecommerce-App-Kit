const BASE_URL = "https://e-comm06.vercel.app";

export async function getProducts() {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();

    return data.result;
}

export async function getNews() {
    const res = await fetch(`${BASE_URL}/api/categories`);
    return res.json();
}

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

