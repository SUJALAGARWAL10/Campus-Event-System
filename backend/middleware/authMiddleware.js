const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= PROTECT ROUTE =================
exports.protect = async (req, res, next) => {
  let token;

  // Check header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from DB (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {
      console.error("Auth error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

// ================= HOST ONLY =================
exports.isHost = (req, res, next) => {
  if (req.user && req.user.role === "host") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Host only" });
  }
};

// ================= STUDENT ONLY =================
exports.isStudent = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Students only" });
  }
};