const mongoose = require("mongoose");

const insurancePolicySchema = new mongoose.Schema({
  createdby: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    requird: [true, "must be created by admin"],
  },
  policy_name: {
    type: String,
    required: true,
  },
  premium: {
    type: Number,
    required: true,
  },
  agent_visit_fee: {
    type: Number,
    required: true,
  },
  coverage_details: {
    crop_type: { type: String, required: true },
    max_coverage: { type: Number, required: true },
    duration_months: { type: Number, required: true },
  },
  terms_conditions: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Insurance = mongoose.model("Insurance", insurancePolicySchema);
module.exports = Insurance;
