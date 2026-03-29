const express = require("express");
const router = express.Router();

const {
  registerForEvent,
  getMyRegistrations,
} = require("../controllers/registrationController");

const { protect, isStudent } = require("../middleware/authMiddleware");

// ================= ROUTES =================

// Student only
router.post("/", protect, isStudent, registerForEvent);
router.get("/my", protect, isStudent, getMyRegistrations);

module.exports = router;