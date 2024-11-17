const express = require("express");
const farmerController = require("../controllers/farmregisterController");
const authController = require("../controllers/authController");

const router = express.Router();

// Public route: Get all farmers
router.get("/", farmerController.getAllFarmers);

// Protect all routes (authentication middleware)
router.use(authController.protect);

// Routes for agents or admins only
router
  .route("/")
  .post(
    authController.restrictTo("agent", "admin"),
    farmerController.createFarmer
  );

router
  .route("/:id")
  .get(
    authController.restrictTo("agent", "admin"),
    farmerController.getFarmerById
  );

module.exports = router;
