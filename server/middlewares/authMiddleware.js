const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse } = require("../utils/response");

//////////////////////////////////////////////////////
// AUTHENTICATION 
//////////////////////////////////////////////////////
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return errorResponse(res, "Not authorized, no token", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    req.user = user;

    next();
  } catch (error) {
    return errorResponse(res, "Not authorized, token failed", 401);
  }
};

//////////////////////////////////////////////////////
// AUTHORIZATION (ROLE BASED)
//////////////////////////////////////////////////////
const authorize = (...roles) => {
  return (req, res, next) => {
    // roles = ["admin"] or ["admin", "user"]

    if (!req.user) {
      return errorResponse(res, "User not authenticated", 401);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Access denied. Role (${req.user.role}) not allowed`,
        403
      );
    }

    next();
  };
};

module.exports = { protect, authorize };