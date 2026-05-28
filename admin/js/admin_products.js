import {
    createProduct,
    deleteProduct,
    getCategories,
    getProducts,
    patchFlagProduct,
    updateProduct,
    uploadImg
} from "../../js/api.js";
import { showErrors } from "../utils/showErrors.js";

import { validateProduct } from "../utils/validate_admin.js";

export function renderProduct() {

    const content = document.querySelector(".admin-content");

    content.innerHTML = `
        <div class="products-container">
            <h1>Quản lý sản phẩm</h1>

            <form id="createForm">

                <input type="text" id="productName" placeholder="Tên sản phẩm" />
                <p class="error" id="nameErr"></p>

                <input type="number" id="productPrice" placeholder="Giá" />
                <p class="error" id="priceErr"></p>

                <input type="text" id="productDesc" placeholder="Mô tả" />
                <p class="error" id="descErr"></p>

                <input type="number" id="productStock" placeholder="Số lượng tồn kho" />
                <p class="error" id="stockErr"></p>

                <input type="number" id="productSoldCount" placeholder="Số lượng đã bán" />

                <select id="productIsFeatured">
                    <option value="false">Normal</option>
                    <option value="true">HOT</option>
                </select>

                <select id="productCategoryId">
                    <option value="">-- Chọn category --</option>
                </select>
                <p class="error" id="categoryErr"></p>

                <input type="file" id="productImage" multiple accept="image/*" />

                <p id="uploadErr" style="color:red;"></p>
                <p id="uploadMes" style="color:green;"></p>

                <button type="submit" id="submitBtn">Lưu sản phẩm</button>
                <table id="productsTable"></table>
            </form>

            <!-- Thêm form edit -->
            <div id="updateForm" style="display:none;">
                <input type="text" id="updateName" placeholder="Tên sản phẩm" />
                <input type="text" id="updateDesc" placeholder="Mô tả" />
                <input type="number" id="updatePrice" placeholder="Giá" />
                <input type="number" id="updateStock" placeholder="Số lượng tồn kho" />
                <input type="number" id="updateSoldCount" placeholder="Số lượng đã bán" />
                <select id="updateIsFeatured">
                    <option value="false">Normal</option>
                    <option value="true">HOT</option>
                </select>
                <select id="updateCategoryId">
                    <option value="">-- Chọn category --</option>
                </select>
                <input type="file" id="updateImage" accept="image/*" />
                <p id="updateErr" style="color:red;"></p>
                <p id="updateMes" style="color:green;"></p>
                <button type="button" id="updateSubmitBtn">Cập nhật</button>
                <button type="button" id="updateCancelBtn">Hủy</button>
            </div>
        </div>
    `;

    document
        .getElementById("createForm")
        .addEventListener("submit", handleCreate);

    document.getElementById("updateSubmitBtn").addEventListener("click", handleUpdate);
    document.getElementById("updateCancelBtn").addEventListener("click", () => {
        document.getElementById("updateForm").style.display = "none";
    });

    renderProductsTable();
    renderCategoryOptions();
}

async function handleCreate(e) {

    e.preventDefault();

    clearErrors();

    const uploadErr = document.getElementById("uploadErr");
    const uploadMes = document.getElementById("uploadMes");

    let imgUrl = [];

    const imgFiles = document.getElementById("productImage").files;

    // upload image
    if (imgFiles.length > 0) {

        if (imgFiles.length > 5) {
            uploadErr.textContent = "Chỉ được upload tối đa 5 ảnh";
            return;
        }

        uploadMes.textContent = `Đang upload ${imgFiles.length} ảnh...`;

        for (const file of imgFiles) {

            try {

                const result = await uploadImg(file);

                const url = result.url;

                console.log(result);

                if (url) {
                    imgUrl.push(url);
                }

            } catch (error) {

                console.error(error);

                uploadErr.textContent = "Upload ảnh thất bại";
            }
        }

        uploadMes.textContent = "Upload ảnh thành công";
    }

    // product object
    const product = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDesc").value,
        price: Number(document.getElementById("productPrice").value),
        stock: Number(document.getElementById("productStock").value),
        soldCount: Number(document.getElementById("productSoldCount").value),
        isFeatured:
            document.getElementById("productIsFeatured").value === "true",
        categoryId: document.getElementById("productCategoryId").value,
        image: imgUrl[0],
    };

    // validate
    const errors = validateProduct(product);

    if (Object.keys(errors).length > 0) {

        showErrors(errors);

        return;
    }

    try {

        console.log(product);
        await createProduct(product);
        document.getElementById("createForm").reset();

        await renderProductsTable();

        alert("Tạo sản phẩm thành công");

    } catch (error) {

        console.error(error);

        alert("Tạo sản phẩm thất bại");
    }
}

function clearErrors() {

    document.querySelectorAll(".error").forEach(item => {
        item.textContent = "";
    });
}

async function handleUpdate() {
    const updateErr = document.getElementById("updateErr");
    const updateMes = document.getElementById("updateMes");

    updateErr.textContent = "";
    updateMes.textContent = "";

    // Upload ảnh mới nếu có
    let imgUrl = document.getElementById("updateImage").dataset.currentImg ?? "";
    const imgFile = document.getElementById("updateImage").files[0];

    if (imgFile) {
        updateMes.textContent = "Đang upload ảnh...";
        const result = await uploadImg(imgFile);
        imgUrl = result?.url ?? imgUrl;
    }

    const product = {
        id: document.getElementById("updateId").value,
        name: document.getElementById("updateName").value,
        description: document.getElementById("updateDesc").value,
        price: Number(document.getElementById("updatePrice").value),
        stock: Number(document.getElementById("updateStock").value),
        soldCount: Number(document.getElementById("updateSoldCount").value),
        isFeatured: document.getElementById("updateIsFeatured").value === "true",
        categoryId: document.getElementById("updateCategoryId").value,
        image: imgUrl,
    };

    await updateProduct(product);
    updateMes.textContent = "Cập nhật thành công!";
    document.getElementById("updateForm").style.display = "none";
    renderProductsTable();
}

async function handleDelete(productId) {
    if (!confirm("Bạn muốn xóa sản phẩm này?")) return;

    await deleteProduct(productId);
    renderProductsTable();
}

async function patchFlag(productId) {
    await patchFlagProduct(productId);
}

export async function renderProductsTable() {
    const table = document.getElementById("productsTable");

    const products = await getProducts();

    table.innerHTML = `
        <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
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
                <td>${product.image}</td>
                <td>${product.category.name}</td>
                <td>
                    <button class="deleteBtn" data-id="${product._id}">Xóa</button>
                    <button class="editBtn" data-id="${product._id}" data-name="${product.name}" data-desc="${product.description}" data-price="${product.price}" data-img="${product.image}" data-slug="${product.category.name}">Sửa</button>
                </td>
            </tr>
        `
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", () => handleDelete(btn.dataset.id));
    });

    document.querySelectorAll(".editBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("updateId").value = btn.dataset.id;
            document.getElementById("updateName").value = btn.dataset.name;
            document.getElementById("updateDesc").value = btn.dataset.desc;
            document.getElementById("updatePrice").value = btn.dataset.price;

            // Lưu url ảnh cũ vào data attribute để dùng nếu không upload ảnh mới
            document.getElementById("updateImage").dataset.currentImg = btn.dataset.img;

            document.getElementById("updateForm").style.display = "block";
        });
    });
}

async function renderCategoryOptions() {

    const select = document.getElementById("productCategoryId");

    const categories = await getCategories();

    categories.forEach(category => {

        select.innerHTML += `
            <option value="${category._id}">
                ${category.name}
            </option>
        `;
    });
}