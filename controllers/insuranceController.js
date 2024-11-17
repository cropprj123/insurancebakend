const InsurancePolicy = require("../models/insuranceModel"); // Adjust path if necessary
const catchAsync = require("../utils/catchAsync"); // Optional utility for async error handling

// Create Insurance Policy (Restricted to Admins)
exports.createInsurancePolicy = catchAsync(async (req, res, next) => {
  const {
    policy_name,
    premium,
    agent_visit_fee,
    coverage_details,
    terms_conditions,
  } = req.body;

  // Check if the logged-in user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "fail",
      message: "Only admins can create insurance policies",
    });
  }

  const newPolicy = await InsurancePolicy.create({
    createdby: req.user.id, // admin who creates the policy
    policy_name,
    premium,
    agent_visit_fee,
    coverage_details,
    terms_conditions,
  });

  res.status(201).json({
    status: "success",
    data: {
      policy: newPolicy,
    },
  });
});

// Get All Insurance Policies
exports.getAllInsurancePolicies = catchAsync(async (req, res, next) => {
  const policies = await InsurancePolicy.find().populate(
    "createdby",
    "name email"
  ); // Populate admin details

  res.status(200).json({
    status: "success",
    results: policies.length,
    data: {
      policies,
    },
  });
});

// Get Insurance Policy by ID
exports.getInsurancePolicyById = catchAsync(async (req, res, next) => {
  const policy = await InsurancePolicy.findById(req.params.id).populate(
    "createdby",
    "name email"
  );

  if (!policy) {
    return res.status(404).json({
      status: "fail",
      message: "Insurance policy not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      policy,
    },
  });
});

// Update Insurance Policy (Restricted to admins)
exports.updateInsurancePolicy = catchAsync(async (req, res, next) => {
  const policy = await InsurancePolicy.findById(req.params.id);

  if (!policy) {
    return res.status(404).json({
      status: "fail",
      message: "Insurance policy not found",
    });
  }

  // Check if the logged-in user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "fail",
      message: "Only admins can update insurance policies",
    });
  }

  const updatedPolicy = await InsurancePolicy.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      policy: updatedPolicy,
    },
  });
});

// Delete Insurance Policy (Restricted to admins)
exports.deleteInsurancePolicy = catchAsync(async (req, res, next) => {
  const policy = await InsurancePolicy.findById(req.params.id);

  if (!policy) {
    return res.status(404).json({
      status: "fail",
      message: "Insurance policy not found",
    });
  }

  // Check if the logged-in user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "fail",
      message: "Only admins can delete insurance policies",
    });
  }

  await policy.remove();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
