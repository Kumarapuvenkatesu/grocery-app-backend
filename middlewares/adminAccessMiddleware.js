const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.adminAccessMiddleware=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1];
if(!token){
    return res.status(401).json({msg:"No token provided"});
}
try {
    const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
    req.adminId=verifyToken.AdminId;
    next();
} catch (error) {
    return res.status(401).json({msg:"Invalid token"});
}
}
