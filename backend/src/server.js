const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const { helmet, apiLimiter, xss, sanitizeRequest } = require("./middleware/security");

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",      // React web
  "http://localhost:5173",      // Vite
  "https://yourdomain.com"      // Production
]

// Normal body parser (JSON)
app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(morgan("dev"));

app.use(helmet());         // Protects headers
app.use(apiLimiter);       // Rate limiter
app.use(xss());            // Prevent XSS
app.use(sanitizeRequest);  // Prevent Mongo injection


// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
// AnalyticalRoutes
app.use("/api/analytics", require("./routes/analyticsRoutes"));
// retailer routes for b2b 
app.use("/api/retailer", require("./routes/retailerRoutes"));


  

// HEALTH CHECK
app.get("/", (req, res) => res.send("Smart E-Commerce Backend Running ✅"));

// ERROR HANDLER
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
