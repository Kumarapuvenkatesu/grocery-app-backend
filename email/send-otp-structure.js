const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendOtpEmail = async (email, otp) => {
 await transporter.sendMail({
    from: `Grocery App <${process.env.EMAIL_USER}>`,
    to: email, // list of receivers
    subject: "Your OTP for Grocery App Registration", 
    html: `<h2>Your OTP ${otp}</h2> <p>Valid for Only 5 Minutes </p>`,
})
};