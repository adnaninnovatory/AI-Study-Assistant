const express = require("express");

const {
  sendRegisterOTP,
  verifyRegisterOTP,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

//////////////////////////////////////////////////////
// REGISTRATION (OTP BASED)
//////////////////////////////////////////////////////

// Step 1: Send OTP
router.post("/send-otp", sendRegisterOTP);

// Step 2: Verify OTP and register
router.post("/verify-otp", verifyRegisterOTP);

//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////

router.post("/login", loginUser);

//////////////////////////////////////////////////////
// PASSWORD RESET
//////////////////////////////////////////////////////

// Step 1: Send OTP for reset
router.post("/forgot-password", forgotPassword);

// Step 2: Reset password
router.post("/reset-password", resetPassword);

module.exports = router;