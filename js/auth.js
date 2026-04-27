import { loginAPI, registerAPI } from "./api.js";

export function initAuth() {

    const login = document.querySelector("#login-form");
    const regis = document.querySelector("#register-form");

    if (login) {
        login.addEventListener("submit", async (e) => {

            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const data = await loginAPI(email, password);

                if (!data || !data.token) {
                    console.log("NO TOKEN FOUND!");
                    alert("Login failed! No token received");
                    return;
                }

                localStorage.setItem("token", data.token);

                window.location.href = "../index.html"

            } catch (err) {
                console.error("Error caught:", err);
                alert("Error login!");
            }
        });
    }

    if (regis) {
        regis.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const data = await registerAPI(name, email, password);

                if (!data || !data.token) {
                    alert("Register failed!");
                    return;
                }

                localStorage.setItem("token", data.token);

                alert("Register success!");

                window.location.href = "../pages/login.html";
            } catch (err) {
                console.error(err);
                alert("Error register!");
            }
        })
    }
}