const express = require("express");
const authenticate = require("../middleware/Authenticate.js");
const admin = require("../middleware/Admin.js");
const OrderController = require("../controllers/OrderController.js");

const router = express.Router();

/* ================= ORDER ITEM HISTORY ================= */

router.get("/orders/history", authenticate, OrderController.getOrderItemHistory);

router.delete(
  "/orders/history/:itemId",
  authenticate,
  OrderController.deleteOrderItem
);

/* ==================== USER ROUTES ==================== */

router.get("/orders/my-orders", authenticate, OrderController.getUserOrders);

router.post("/orders/create", authenticate, OrderController.createOrder);

router.put("/orders/cancel/:id", authenticate, OrderController.cancelOrder);

/* ==================== ADMIN ROUTES ==================== */

router.get("/orders/all", authenticate, admin("ADMIN"), OrderController.getAllOrdersAdmin);

router.put(
  "/orders/status/:id",
  authenticate,
  admin("ADMIN"),
  OrderController.updateOrderStatusAdmin
);

router.delete(
  "/orders/delete/:id",
  authenticate,
  admin("ADMIN"),
  OrderController.deleteOrder
);

/* ==================== COMMON ROUTE ==================== */

// ✅ KEEP THIS LAST
router.get("/orders/:id", authenticate, OrderController.getOrderById);

module.exports = router;