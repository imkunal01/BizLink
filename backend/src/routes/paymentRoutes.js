const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Order = require("../models/Order");
const Transaction = require("../models/Transaction");
const { createOrderForPayment, razorpayWebhook, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const {generateAndSendInvoice } = require("../controllers/invoiceController");

// Create razorpay order (client calls this to get razorpay order id)
router.post("/create-order", protect, createOrderForPayment);

// Optional server-side verify (client can call after checkout)
router.post("/verify", verifyPayment);

/**
 * Webhook endpoint:
 * - Must be reachable publicly (set this URL in Razorpay Dashboard -> Webhooks)
 * - Must use raw body parser when mounting in server so signature verification works
 */
router.post("/webhook", razorpayWebhook);

module.exports = router;
