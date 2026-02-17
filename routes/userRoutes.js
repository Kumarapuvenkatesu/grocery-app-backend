const sendMailForOtp=require("../controllers/sendEmailController");
const express=require("express");
const router=express.Router();

router.post('/send-otp',sendMailForOtp.sendMailForOtp);

module.exports=router;