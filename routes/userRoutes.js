const sendMailForOtp=require("../controllers/sendEmailController");
const express=require("express");
const router=express.Router();

router.post('/send-otp',sendMailForOtp.sendMailForOtp);
router.post('/verify-otp',sendMailForOtp.verifyOtp);

module.exports=router;