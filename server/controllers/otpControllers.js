const OTP = require("../models/otpModel")
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// transporter
// for gmail using app password
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.EMAIL_ADDRESS,
        pass:process.env.EMAIL_APP_PASSWORD
    } 
});

module.exports.generateOTP = async (req,res)=>{
    const {email} = req.body;
    try{
        const otp = await OTP.generateOTP(email);
        const options = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "simplBlogs OTP REQUEST",
            text: `Your OTP is: ${otp}`
        };
        transporter.sendMail(options, function(err, info){
            if(err){
                throw Error("Error in sending OTP");
            }
            console.log("sent: " + info.response);
        }
        );
        res.status(200).json({message: "OTP sent to email"});
    }
    catch(err){
        console.log("Error in verifyOTP: ",err);
        res.status(400).json({message: "Error in generating OTP"});
    }
}

module.exports.verifyOTP = async (req,res)=>{
    console.log(req.body);
    const {email,otp,password} = req.body;
    try{
        const result = await OTP.verifyOTP(email,otp);
        // if otp is verified then delete it

        if(result === true){
            await OTP.deleteOTP(email);
            // update password
            const user = await User.changePassword(email,password);
            
            if(!user){
                throw Error("Error in changing password");
            }

            res.status(200).json({message: "OTP verified"});
        }
        else{
            throw Error("Invalid OTP");
        }
    }
    catch(err){
        
        res.status(400).json({message: "OTP verification failed"});
    }
}