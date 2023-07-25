const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router.post("/login",authController.login)
router.post("/signup",authController.signup)
router.post("/verifyLogin",authController.verifyLogin)

module.exports = router;