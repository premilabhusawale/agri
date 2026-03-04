const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue from delivered orders
    const orders = await Order.find({ orderStatus: "DELIVERED" });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Recent orders (last 5)
    const recentOrders = await Order.find()
      .populate("user", "name surname email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue
      },
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAdminStats
};
