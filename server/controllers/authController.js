const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  generateOTP,
  saveOTP,
  verifyOTP,
} = require("../services/otpService.js");
const { sendOTPEmail } = require("../services/emailService.js");
const { successResponse, errorResponse } = require("../utils/response.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//////////////////////////////////////////////////////
// SEND OTP
//////////////////////////////////////////////////////
export const sendRegisterOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return errorResponse(res, "User already exists", 400);
    }

    const otp = generateOTP();
    await saveOTP(email, otp);
    await sendOTPEmail(email, otp);

    return successResponse(res, "OTP sent successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

//////////////////////////////////////////////////////
// VERIFY OTP + REGISTER
//////////////////////////////////////////////////////
export const verifyRegisterOTP = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    if (!name || !email || !password || !otp) {
      return errorResponse(res, "All fields are required", 400);
    }

    const isValid = await verifyOTP(email, otp);

    if (!isValid) {
      return errorResponse(res, "Invalid or expired OTP", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      isVerified: true,
    });

    const token = generateToken(user._id);

    return successResponse(res, "User registered successfully", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    }, 201);

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    if (!user.isVerified) {
      return errorResponse(res, "Email not verified", 401);
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = generateToken(user._id);

    return successResponse(res, "Login successful", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

//////////////////////////////////////////////////////
// FORGOT PASSWORD
//////////////////////////////////////////////////////
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    const otp = generateOTP();
    await saveOTP(email, otp);
    await sendOTPEmail(email, otp);

    return successResponse(res, "OTP sent for password reset");

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

//////////////////////////////////////////////////////
// RESET PASSWORD
//////////////////////////////////////////////////////
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return errorResponse(res, "All fields are required", 400);
    }

    const isValid = await verifyOTP(email, otp);

    if (!isValid) {
      return errorResponse(res, "Invalid or expired OTP", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    user.password = newPassword;
    await user.save();

    return successResponse(res, "Password reset successful");

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};