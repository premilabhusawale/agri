const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/Authenticate.js");
const admin = require("../middleware/Admin.js");
const Product_Controller = require("../controllers/ProductController.js");
const { upload, uploadProduct } = require("../config/cloudnary");

/* ADMIN */
router.post(
  "/product/create",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.createProduct
);

router.delete(
  "/product/:id",
  authenticate,
  admin("ADMIN"),
  Product_Controller.deleteProduct
);

router.put(
  "/product/:id",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.updateProduct
);

/* PUBLIC */
router.get("/product/hot-deals", Product_Controller.getHotDeals);
router.get("/product", Product_Controller.getAllProducts);
router.get("/product/category/:category", Product_Controller.getProductsByCategory);
router.get("/product/:id", Product_Controller.findProductById);
router.get("/product/:id/related", Product_Controller.getRelatedProducts);

module.exports = router;