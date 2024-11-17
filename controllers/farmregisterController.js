const Farmer = require("../models/farmerModel"); // Path to Farmer model
const catchAsync = require("../utils/catchAsync"); // Optional utility for async error handling

// Create Farmer (Restricted to Agents)
exports.createFarmer = catchAsync(async (req, res, next) => {
  const { farmer, location, insurance } = req.body;

  // Check if the logged-in user is an agent

  const newFarmer = await Farmer.create({
    farmer,
    agent: req.user.id, // Automatically assign the logged-in agent
    location,
    insurance,
  });

  res.status(201).json({
    status: "success",
    data: {
      farmer: newFarmer,
    },
  });
});
exports.getAllFarmers = catchAsync(async (req, res, next) => {
  const farmers = await Farmer.find()
    .populate("farmer", "name email") // Populate Farmer's details
    .populate("agent", "name email") // Populate Agent's details
    .populate("insurance", "policy_name premium terms_conditions"); // Populate Insurance details

  res.status(200).json({
    status: "success",
    results: farmers.length,
    data: {
      farmers,
    },
  });
});
// Get Farmer by ID
exports.getFarmerById = catchAsync(async (req, res, next) => {
  const farmer = await Farmer.findById(req.params.id)
    .populate("farmer", "name email")
    .populate("agent", "name email")
    .populate("insurance", "policy_name premium terms_conditions");

  if (!farmer) {
    return res.status(404).json({
      status: "fail",
      message: "Farmer not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      farmer,
    },
  });
});
