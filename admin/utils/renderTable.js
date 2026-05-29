import { deleteCategory, deleteProduct, getCategories, getProducts } from "../../js/api.js";
import { clearErrors } from "../utils/clearErrors.js"
import { renderCategoryOptions } from "./renderCategoryOption.js";

export async function renderProductsTable() {
    const table = document.getElementById("productsTable");

    const products = await getProducts();

    table.innerHTML = `
        <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <!-- <th>Hình ảnh</th> -->
            <th>Danh mục sản phẩm</th>
            <th>Trạng thái</th>
        </tr>
    `

    products.forEach(product => {

        table.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <!-- <td>${product.image}</td> -->
                <td>${product.category.name}</td>
                <td>
                    <button class="productDeleteBtn" data-id="${product._id}">Xóa</button>
                    <button class="productEditBtn" data-id="${product._id}" data-name="${product.name}" data-desc="${product.description}" data-price="${product.price}" data-img="${product.image}" data-categoryid="${product.category._id}">Sửa</button>
                </td>
            </tr>
        `
    });

    document.querySelectorAll(".productDeleteBtn").forEach(btn => {
        btn.addEventListener("click", () => handleProductDelete(btn.dataset.id));
    });

    document.querySelectorAll(".productEditBtn").forEach(btn => {
        btn.addEventListener("click", async () => {
            clearErrors();

            document.getElementById("updateId").value = btn.dataset.id;
            document.getElementById("updateName").value = btn.dataset.name;
            document.getElementById("updateDesc").value = btn.dataset.desc;
            document.getElementById("updatePrice").value = btn.dataset.price;
            // document.getElementById("updateImage").dataset.currentImg = btn.dataset.img;

            await renderCategoryOptions("updateCategoryId");
            document.getElementById("updateCategoryId").value = btn.dataset.categoryid;

            document.getElementById("updateForm").style.display = "block";
        });
    });
}

async function handleProductDelete(productId) {
    if (!confirm("Bạn muốn xóa sản phẩm này?")) return;

    await deleteProduct(productId);
    renderProductsTable();
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
                    <button class="categoryEditBtn"   data-id="${category._id}" data-name="${category.name}" data-desc="${category.description}" data-active="${category.isActive}">Sửa</button>
                    <button class="categoryDeleteBtn" data-id="${category._id}">Xóa</button>
                </td>
            </tr>
        `
    })

    document.querySelectorAll(".categoryEditBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("updateId").value = btn.dataset.id;
            document.getElementById("updateName").value = btn.dataset.name;
            document.getElementById("updateDescription").value = btn.dataset.desc;
            document.getElementById("updateIsActive").value = btn.dataset.active;

            document.getElementById("updateForm").style.display = "block";
        })
    })

    document.querySelectorAll(".categoryDeleteBtn").forEach(btn => {
        btn.addEventListener("click", () => handleCategoryDelete(btn.dataset.id));
    });
}

async function handleCategoryDelete(id) {
    if (!confirm("Bạn có muốn xóa category này?")) return;

    await deleteCategory(id);
    renderCategoryTable();
}