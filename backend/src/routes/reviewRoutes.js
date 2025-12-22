const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { listByProduct, create, getAllReviews, deleteReview } = require("../controllers/reviewController");

router.get("/product/:productId", listByProduct);
router.post("/product/:productId", protect, create);
router.get("/all", protect, adminOnly, getAllReviews);
router.delete("/:id", protect, adminOnly, deleteReview);

module.exports = router;

