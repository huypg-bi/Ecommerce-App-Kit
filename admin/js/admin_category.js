import { createCategory, updateCategory } from "../../js/api.js";
import { renderCategoryTable } from "../utils/renderTable.js";
import { categoryFormTemplate } from "../utils/template.js";

export function renderCategory() {
    const content = document.querySelector(".admin-content");

    content.innerHTML = categoryFormTemplate();

    document
        .getElementById("submitBtn")
        .addEventListener("click", handleCreate)

    document
        .getElementById("cancelBtn")
        .addEventListener("click", () => {
            document.getElementById("createForm").style.display = "none";
        })

    document
        .getElementById("createBtn")
        .addEventListener("click", () => {
            document.getElementById("createForm").style.display = "block";
        })

    document
        .getElementById("updateSubmitBtn")
        .addEventListener("click", handleUpdate);

    document
        .getElementById("updateCancelBtn")
        .addEventListener("click", () => {
            document.getElementById("updateForm").style.display = "none";
        });

    renderCategoryTable();
}

async function handleCreate(e) {
    e.preventDefault();

    const category = {
        name: document.getElementById("categoryName").value,
        description: document.getElementById("categoryDescription").value,
        isActive: document.getElementById("categorysisActive").value === "true",
    }

    await createCategory(category);
    alert("Tạo category thành công!");
    document.getElementById("createForm").style.display = "none";
    renderCategoryTable();
}

async function handleUpdate() {
    const category = {
        id: document.getElementById("updateId").value,
        name: document.getElementById("updateName").value,
        description: document.getElementById("updateDescription").value,
        isActive: document.getElementById("updateIsActive").value === "true",
    };

    await updateCategory(category);
    alert("Cập nhật thành công!");
    document.getElementById("updateForm").style.display = "none";
    renderCategoryTable();
}