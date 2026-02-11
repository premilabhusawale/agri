const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/Authenticate.js");
const admin = require("../middleware/Admin.js");
const Product_Controller = require("../controllers/ProductController.js");
const { upload, uploadProduct } = require("../config/cloudnary");

/* ADMIN */
router.post(
  "/create",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.createProduct
);

router.delete(
  "/:id",
  authenticate,
  admin("ADMIN"),
  Product_Controller.deleteProduct
);

router.put(
  "/:id",
  authenticate,
  admin("ADMIN"),
  uploadProduct, // same Multer middleware
  Product_Controller.updateProduct
);

/* PUBLIC */
router.get("/hot-deals", Product_Controller.getHotDeals);
router.get("/", Product_Controller.getAllProducts);
router.get("/category/:category", Product_Controller.getProductsByCategory);
router.get("/:id", Product_Controller.findProductById);
router.get("/:id/related", Product_Controller.getRelatedProducts);

module.exports = router;