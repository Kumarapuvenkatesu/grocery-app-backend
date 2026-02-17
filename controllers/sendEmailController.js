const userModel=require("../models/UsersRegistration");
const {sendOtpEmail}=require("../email/send-otp-structure");
const {generateOtp}=require("../email/otp-generator");

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
        return res.status(200).json({success:true,msg:"OTP sended Successfully ",name:name})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}