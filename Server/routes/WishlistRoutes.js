const express = require ("express");
const WishlistController  = require("../Controllers/WishlistController.js");
const authenticate = require ("../middleware/Authenticate.js");

const router = express.Router();

router.post("/wishlist/add", authenticate, WishlistController.addToWishlist);

router.delete("/wishlist/:productId", authenticate, WishlistController.removeFromWishlist);

router.get("/wishlist/get", authenticate, WishlistController.getWishlist);

module.exports = router;