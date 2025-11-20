const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("mongo-sanitize");

// Rate Limiter (Prevent DDoS / brute force)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,                 // limit each IP to 200 requests
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// Input Sanitization
const sanitizeRequest = (req, res, next) => {
  req.body = mongoSanitize(req.body);
  req.query = mongoSanitize(req.query);
  req.params = mongoSanitize(req.params);
  next();
};

module.exports = {
  helmet,
  apiLimiter,
  xss,
  sanitizeRequest,
};
