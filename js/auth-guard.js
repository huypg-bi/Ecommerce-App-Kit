export function preventAuthPages() {

    const token = localStorage.getItem("token");

    if (!token) return;

    const path = window.location.href;

    if (path.includes("login.html") || path.includes("register.html")) {
        window.location.href = "../index.html";
    }
}