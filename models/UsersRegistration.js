const mongoose=require('mongoose');

const userRegistrationSchema=new mongoose.Schema({
    name:{
        type:String
    },email:{
        type:String,
        required:true,
        unique:true
    },otp:String,
    expiresOtp:String
},{timestamps:true});

module.exports=mongoose.model("UserRegistration",userRegistrationSchema);