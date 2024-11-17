const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Farmer should be present"],
  },
  agent: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Agent must be assigned"],
  },
  location: {
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: [true, "Coordinates are required"],
      validate: {
        validator: function (val) {
          return val.length === 2; // Ensure it's [longitude, latitude]
        },
        message: "Coordinates must be an array of [longitude, latitude]",
      },
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    district: {
      type: String,
      default: null, // Optional field
    },
    taluka: {
      type: String,
      default: null, // Optional field
    },
    radius: {
      type: Number,
      required: [true, "Radius of the farm area is required"],
      min: [1, "Radius must be at least 1 meter"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    description: {
      type: String,
      default: "", // Optional field
    },
  },
  insurance: {
    type: mongoose.Schema.ObjectId,
    ref: "Insurance",
    required: [true, "Insurance must be selected"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

module.exports = mongoose.model("Farmer", farmerSchema);
