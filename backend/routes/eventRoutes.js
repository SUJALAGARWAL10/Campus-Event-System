const express = require("express");
const router = express.Router();

const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { protect, isHost } = require("../middleware/authMiddleware");

// ================= ROUTES =================

// Public
router.get("/", getAllEvents);

// Protected (Host only)
router.post("/", protect, isHost, createEvent);
router.put("/:id", protect, isHost, updateEvent);
router.delete("/:id", protect, isHost, deleteEvent);

module.exports = router;