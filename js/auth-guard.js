export function preventAuthPages() {

    const token = localStorage.getItem("token");

    // nếu đã login
    if (token) {

        // nếu đang ở login/register
        const path = window.location.pathname;

        if (
            path.includes("login.html") ||
            path.includes("register.html")
        ) {
            window.location.href = "../index.html";
        }
    }
}