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

export async function getAndSetUserName() {
    const token = localStorage.getItem("token");
    const profileName = document.getElementById("profileName");
    const profileLink = document.getElementById("profileLink");

    if (!token) {
        if (profileName) profileName.textContent = "My profile";
        return;
    }

    try {
        const user = await getMe();
        if (profileName) profileName.textContent = user.name;
    } catch (error) {
        console.error(error);
    }
}