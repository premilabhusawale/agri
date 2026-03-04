const PaymentService = require("../services/PaymentService.js");
const Payment = require('../models/Payment.js');
const OrderService = require('../services/OrderService.js');

const createPaymentLink = async (req, res) => {
  try {
    const result = await PaymentService.createPaymentLink(req.params.orderId);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("PAYMENT ERROR 👉", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePaymentInformation = async (req, res) => {
  try {
    const { orderId, razorpay_payment_link_status } = req.query;

    // ✅ Update payment and order in DB
    await PaymentService.updatePaymentInformation(req.query);

    if (razorpay_payment_link_status === "paid") {
      // ✅ Redirect to Orders page on success
      return res.redirect("http://localhost:5173/Orders");
    } else {
      // ❌ Payment cancelled or failed — redirect back to checkout
      return res.redirect("http://localhost:5173/CheckOut?payment=failed");
    }

  } catch (error) {
    console.error("PAYMENT CALLBACK ERROR 👉", error.message);
    // ❌ On error — redirect with error param instead of showing raw error
    return res.redirect("http://localhost:5173/Orders?payment=error");
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};