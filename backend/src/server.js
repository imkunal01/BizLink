const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const { helmet, apiLimiter, sanitizeRequest } = require("./middleware/security");

dotenv.config();
connectDB();

const app = express();

/* =========================
   CORS CONFIG (INLINE)
========================= */

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://kripa-connect-app.vercel.app"
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // ✅ enough, no app.options("*")



/* =========================
   BODY PARSER
========================= */

// Keep rawBody support (useful for Razorpay later)
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

/* =========================
   MIDDLEWARES
========================= */

app.use(morgan("dev"));
app.use(cookieParser());

app.use(helmet());
app.use(apiLimiter);
app.use(sanitizeRequest);

/* =========================
   ROUTES
========================= */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/retailer", require("./routes/retailerRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.send("Smart E-Commerce Backend Running ✅");
});

/* =========================
   ERROR HANDLER
========================= */

app.use(errorHandler);

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
