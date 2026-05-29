import {
    createProduct,
    patchFlagProduct,
    updateProduct,
    uploadImg
} from "../../js/api.js";
import { clearErrors } from "../utils/clearErrors.js";
import { renderCategoryOptions } from "../utils/renderCategoryOption.js";
import { renderProductsTable } from "../utils/renderTable.js";
import { showErrors } from "../utils/showErrors.js";
import { productFormTemplate } from "../utils/template.js";
import { validateProduct } from "../utils/validate_admin.js";

export function renderProduct() {

    const content = document.querySelector(".admin-content");

    content.innerHTML = productFormTemplate();

    document
        .getElementById("createForm")
        .addEventListener("submit", handleCreate);

    document
        .getElementById("updateSubmitBtn")
        .addEventListener("click", handleUpdate);

    document
        .getElementById("updateCancelBtn")
        .addEventListener("click", () => {
            document.getElementById("updateForm").style.display = "none";
        });

    document
        .getElementById("createBtn")
        .addEventListener("click", () => {
            document.getElementById("createForm").style.display = "block";
        });

    document
        .getElementById("cancelBtn")
        .addEventListener("click", () => {
            document.getElementById("createForm").style.display = "none";
        });

    renderProductsTable();
    renderCategoryOptions("productCategoryId");
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

async function patchFlag(productId) {
    await patchFlagProduct(productId);
}