const express = require("express");

const authController = require("./../controllers/authController");

const userController = require("./../controllers/userController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.get("/user", authController.user);
module.exports = router;
