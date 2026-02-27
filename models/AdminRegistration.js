const mogoose = require('mongoose');
const bcrypt = require('bcryptjs');
const adminRegistrationSchema = new mogoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin"
    }
});
module.exports = mogoose.model("AdminRegistration", adminRegistrationSchema);