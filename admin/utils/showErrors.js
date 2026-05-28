export function showErrors(errors) {

    Object.keys(errors).forEach(key => {

        const el = document.getElementById(`${key}Err`);

        if (el) {
            el.textContent = errors[key];
        }
    });
}