const adminDetails = require("../models/AdminRegistration");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.registration= async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingAdmin=await adminDetails.findOne({email});
        if(existingAdmin){
            return res.status(400).json({msg:"Admin already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new adminDetails({
            name,
            email,
            password: hashedPassword
        });
        await newAdmin.save();
        res.status(201).json({msg:"Admin registered successfully"});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingEmail=await adminDetails.findOne({email});
        if(!existingEmail){
            return res.status(400).json({msg:"Admin not found"});
        }
        const existingPassword=await bcrypt.compare(password,existingEmail.password);
        if(!existingPassword){
            return res.status(400).json({msg:"Invalid password"});
        }
        const token=jwt.sign({
            AdminId:existingEmail._id,
        },process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(200).json({msg:"Admin logged in successfully",token});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}
