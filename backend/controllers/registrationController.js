const Registration = require("../models/Registration");
const Event = require("../models/Event");

// ================= REGISTER FOR EVENT =================
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const userId = req.user ? req.user.id : null; // will work after auth middleware

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    // Check event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check seats
    if (event.seats <= 0) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Prevent duplicate registration
    const existing = await Registration.findOne({ userId, eventId });

    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Create registration
    await Registration.create({
      userId,
      eventId,
    });

    // Reduce seats
    event.seats -= 1;
    await event.save();

    res.status(201).json({
      message: "✅ Registered successfully",
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error registering for event" });
  }
};


// ================= GET MY REGISTRATIONS =================
exports.getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    const registrations = await Registration.find({ userId })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.status(200).json(registrations);

  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations" });
  }
};