const mongoose=require('mongoose');

const DBconnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
        
    } catch (error) {
        console.log("DB connection error",error);
        throw new Error("MongoDB connection failed")
    }
}
module.exports = DBconnection;