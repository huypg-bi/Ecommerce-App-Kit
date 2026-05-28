export function validateProduct(product) {
    const errors = {};

    if (!product.name?.trim()) {
        errors.name = "Tên sản phẩm không được để trống";
    }

    if (!product.price || Number(product.price) <= 0) {
        errors.price = "Giá phải lớn hơn 0";
    }

    if (!product.description?.trim()) {
        errors.description = "Mô tả không được để trống";
    }

    if (!product.stock || Number(product.stock) < 0) {
        errors.stock = "Stock không hợp lệ";
    }

    if (!product.categoryId?.trim()) {
        errors.categoryId = "Category ID không được để trống";
    }

    return errors;
}