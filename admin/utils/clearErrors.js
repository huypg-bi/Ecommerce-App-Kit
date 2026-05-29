export function clearErrors() {
    document.querySelectorAll(".error").forEach(item => {
        item.textContent = "";
    });
}