const OrderService = require("../services/OrderService.js");

// Create order from cart
const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const shippingAddress = req.body.shippingAddress;

    console.log("📦 CREATE ORDER - user:", user?._id);
    console.log("📦 CREATE ORDER - shippingAddress:", shippingAddress);

    if (!shippingAddress) {
      return res.status(400).json({ success: false, error: "Shipping address required" });
    }

    const order = await OrderService.createOrder(user, shippingAddress);
    console.log("✅ ORDER CREATED:", order._id);
    return res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("❌ CREATE ORDER ERROR:", error); // full stack trace
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get logged-in user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderService.userOrderHistory(req.user._id);
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("❌ GET USER ORDERS ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Get single order (only user's own)
const getOrderById = async (req, res) => {
  try {
    const order = await OrderService.findOrderById(req.params.id);

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("❌ GET ORDER BY ID ERROR:", err);
    return res.status(404).json({ success: false, error: err.message });
  }
};

// Cancel user's own order
const cancelOrder = async (req, res) => {
  try {
    const order = await OrderService.findOrderById(req.params.id);

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const cancelledOrder = await OrderService.cancelOrder(req.params.id);
    return res.status(200).json({ success: true, data: cancelledOrder });
  } catch (err) {
    console.error("❌ CANCEL ORDER ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// ================= ADMIN FUNCTIONS ==================

const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrdersAdmin();
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("❌ GET ALL ORDERS ADMIN ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    let updatedOrder;

    switch (status) {
      case "PLACED":     updatedOrder = await OrderService.placeOrder(req.params.id); break;
      case "CONFIRMED":  updatedOrder = await OrderService.confirmOrder(req.params.id); break;
      case "SHIPPED":    updatedOrder = await OrderService.shipOrder(req.params.id); break;
      case "DELIVERED":  updatedOrder = await OrderService.deliverOrder(req.params.id); break;
      case "CANCELLED":  updatedOrder = await OrderService.cancelOrder(req.params.id); break;
      default: return res.status(400).json({ success: false, error: "Invalid status" });
    }

    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    console.error("❌ UPDATE ORDER STATUS ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await OrderService.deleteOrderById(req.params.id);
    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("❌ DELETE ORDER ERROR:", err);
    return res.status(404).json({ success: false, error: err.message });
  }
};

const getOrderItemHistory = async (req, res) => {
  try {
    const history = await OrderService.getHistory(req.user);
    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (err) {
    console.error("❌ GET ORDER HISTORY ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const result = await OrderService.deleteOrderItem(req.params.itemId, req.user);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error("❌ DELETE ORDER ITEM ERROR:", error);
    res.status(403).json({ success: false, error: error.message });
  }
};

module.exports = {
  getOrderItemHistory,
  deleteOrderItem,
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  deleteOrder,
};