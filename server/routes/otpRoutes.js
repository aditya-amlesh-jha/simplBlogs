const express = require("express");
const router = express.Router();
const otpControllers = require("../controllers/otpControllers");
const otpVerify = require("../middleware/otpVerify");


// for reset password for user not logged in
router.post("/generateOTP",otpControllers.generateOTP);
router.post("/verifyOTP",otpControllers.verifyOTP);


// for reset password for user logged in
router.post("/generateOTPForLoggedInUser",otpVerify,otpControllers.generateOTP);
router.post("/verifyOTPForLoggedInUser",otpVerify,otpControllers.verifyOTP);

module.exports = router;