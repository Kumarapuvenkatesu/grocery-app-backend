const userModel=require("../models/UsersRegistration");
const {sendOtpEmail}=require("../email/send-otp-structure");
const {generateOtp}=require("../email/otp-generator");
const jwt=require("jsonwebtoken");
require('dotenv').config();

exports.sendMailForOtp=async(req,res)=>{
    try {
        const {name,email}=req.body;
        if(!email){
            res.status(400).json({msg:"Email is Required"});
        }
        let user=await userModel.findOne({email});
        if(!user){
            user = await userModel.create({name,email});
        }
        const otp=generateOtp();
        user.otp=otp;
        user.expiresOtp=Date.now()+5*60*1000;
        await user.save();
        await sendOtpEmail(email,otp);
        return res.status(200).json({success:true,msg:"OTP sended Successfully "})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.verifyOtp=async(req,res)=>{
    try {
        const {email,otp}=req.body;
        if(!email){
            res.status(400).json({msg:"Email is Required"});
        }
        if(!otp){
            res.status(400).json({msg:"OTP is Required"});
        }
        let user=await userModel.findOne({email});
        if(!user){
            res.status
        }
        if(user.otp!==otp){
            res.status(400).json({msg:"Invalid OTP"});
        }
        if(user.expiresOtp<Date.now()){
            res.status(400).json({msg:"OTP Expired"});
        }
        user.otp=undefined;
        user.expiresOtp=undefined;
        await user.save();
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(200).json({success:true,msg:"OTP Verified Successfully ",token})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}