const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");
const validate = require('../middleware/validate.js')
const {registerValidation , loginValidation} = require('../validations/authValidations.js')
const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.get("/profile", protect, getUserProfile);


module.exports = router;
