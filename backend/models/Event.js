const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    category: {
      type: String,
      enum: ["tech", "sports", "cultural"],
      required: [true, "Category is required"],
    },

    date: {
      type: Date,
      required: [true, "Event date is required"],
    },

    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },

    seats: {
      type: Number,
      required: true,
      min: [0, "Seats cannot be negative"],
    },

    image: {
      type: String,
      default: "", // frontend fallback will handle
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);