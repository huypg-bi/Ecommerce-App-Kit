export function productFormTemplate() {
    return `
        <div class="products-container">
            <h1>Quản lý sản phẩm</h1>

            <button id="createBtn">+ Thêm sản phẩm</button>

            <form id="createForm" style="display:none;">

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

                <button type="submit" id="submitBtn">Lưu</button>
                <button type="button" id="cancelBtn">Hủy</button>
            </form>

            <table id="productsTable"></table>

            <!-- Thêm form edit -->
            <div id="updateForm" style="display:none;">
                <input type="hidden" id="updateId" />
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
}

export function categoryFormTemplate() {
    return `
        <div class="categories-container">
            <h1>Quản lý Category</h1>

            <button id="createBtn">+ Thêm category</button>

            <!-- Form create --> 
            <form id="createForm" style="display:none;">
                <input type="text" id="categoryName" placeholder="Tên category" />

                <input type="text" id="categoryDescription" placeholder="Mô tả" />

                <select id="categorysisActive">
                    <option value="false">Ẩn</option>
                    <option value="true">Hiện</option>
                </select>
                
                <button type="submit" id="submitBtn">Lưu</button>
                <button type="button" id="cancelBtn">Hủy</button>
            </form>

            <table id="categoriesTable">

            </table>

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
        </div>
    `;
}
