import { getMe } from "./api.js";

export async function initUser() {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
        const user = await getMe();

        const profileText = document.querySelector(".profile");

        if (profileText) {
            profileText.textContent = user.name;
        }
    } catch (error) {
        console.error(error);
    }
}