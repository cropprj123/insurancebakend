const express = require("express");
const insuranceController = require("../controllers/insuranceController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes (authentication middleware)
router.use(authController.protect);

// Routes for creating, updating, and deleting policies (Admins only)
router
  .route("/")
  .post(
    authController.restrictTo("admin"),
    insuranceController.createInsurancePolicy
  )
  .get(insuranceController.getAllInsurancePolicies);

router
  .route("/:id")
  .get(insuranceController.getInsurancePolicyById)
  .patch(
    authController.restrictTo("admin"),
    insuranceController.updateInsurancePolicy
  )
  .delete(
    authController.restrictTo("admin"),
    insuranceController.deleteInsurancePolicy
  );

module.exports = router;
