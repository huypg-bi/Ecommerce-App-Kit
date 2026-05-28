import { createCategory, deleteCategory, getCategories, updateCategory } from "../../js/api.js";

export function renderCategory() {
    const content = document.querySelector(".admin-content");

    content.innerHTML = `
        <div class="categories-container">
            <h1>Quản lý Category</h1>

            <!-- Form create -->
            <form id="createForm" style="display:none;">
                <input type="text" id="categoryName" placeholder="Tên category" />

                <input type="text" id="categoryDescription" placeholder="Mô tả" />

                <select id="categorysisActive">
                    <option value="false">Ẩn</option>
                    <option value="true">Hiện</option>
                </select>
                
                <button type="submit" id="submitBtn">Lưu</button>
                <button type="submit" id="cancelBtn">Hủy</button>
            </form>

            <!-- Form update -->
            <div id="updateForm" style="display:none;">
                <input type="hidden" id="updateId" />
                <input type="text"   id="updateName"        placeholder="Tên category" />
                <input type="text"   id="updateDescription" placeholder="Mô tả" />
                <select id="updateIsActive">
                    <option value="false">Ẩn</option>
                    <option value="true">Hiện</option>
                </select>
                <button type="button" id="updateSubmitBtn">Cập nhật</button>
                <button type="button" id="updateCancelBtn">Hủy</button>
            </div>

            <button id="createBtn">+ Thêm category</button>
            <table id="categoriesTable">

            </table>
        </div>
    `

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

async function handleDelete(id) {
    if (!confirm("Bạn có muốn xóa category này?")) return;

    await deleteCategory(id);
    renderCategoryTable();
}

export async function renderCategoryTable() {
    const categories = await getCategories();

    const table = document.getElementById("categoriesTable");

    table.innerHTML = `
        <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Hành Động</th>
        </tr>
    `

    categories.forEach(category => {
        table.innerHTML += `
            <tr>
                <td>${category.name}</td>
                <td>${category.description}</td>
                <td>${category.isActive ? "Hiện" : "Ẩn"}</td>
                <td>
                    <button class="editBtn"   data-id="${category._id}" data-name="${category.name}" data-desc="${category.description}" data-active="${category.isActive}">Sửa</button>
                    <button class="deleteBtn" data-id="${category._id}">Xóa</button>
                </td>
            </tr>
        `
    })

    document.querySelectorAll(".editBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("updateId").value = btn.dataset.id;
            document.getElementById("updateName").value = btn.dataset.name;
            document.getElementById("updateDescription").value = btn.dataset.desc;
            document.getElementById("updateIsActive").value = btn.dataset.active;

            document.getElementById("updateForm").style.display = "block";
        })
    })

    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", () => handleDelete(btn.dataset.id));
    });
}