import { getWishlist, addWishlist, removeWishlist } from "./api.js";

export async function initWishlist() {
    const wishlistData = await getWishlist();
     const wishlist = wishlistData?.result?.products || [];

    console.log("wishlistData:", wishlistData);
    console.log("wishlist:", wishlist);
    console.log("isArray:", Array.isArray(wishlist));

    document.querySelectorAll(".wishlist-btn").forEach(btn => {
        if (!(btn instanceof HTMLButtonElement)) return;

        const id = btn.dataset.id;

        if (wishlist.find(item => item.productId === id)) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", async () => {
            if (btn.classList.contains("active")) {
                await removeWishlist(id);
                btn.classList.remove("active");
            } else {
                await addWishlist(id);
                btn.classList.add("active");
            }
        })
    })


}