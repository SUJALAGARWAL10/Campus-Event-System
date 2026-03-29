const Event = require("../models/Event");

// ================= CREATE EVENT =================
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, date, venue, seats, image } = req.body;

    // Basic validation
    if (!title || !description || !category || !date || !venue || !seats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      venue,
      seats,
      image,
      createdBy: req.user ? req.user.id : null, // will work after auth middleware
    });

    res.status(201).json({
      message: "✅ Event created successfully",
      event,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating event" });
  }
};

// ================= GET ALL EVENTS =================
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// ================= UPDATE EVENT =================
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // (Later we’ll restrict only host can update their event)

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "✏️ Event updated",
      updatedEvent,
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating event" });
  }
};

// ================= DELETE EVENT =================
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();

    res.json({ message: "🗑️ Event deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting event" });
  }
};