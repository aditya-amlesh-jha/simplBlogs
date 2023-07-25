const mongoose = require("mongoose");
const User = require("./userModel");
const otpGenerator = require("otp-generator");

const otpSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            unique:true,
            required:true
        },
        otp:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

otpSchema.statics.generateOTP = async function(email) {
    // Check if email is in the user collection, as we don't want to send OTP to an email that is not registered
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new Error("Email not registered");
    }

    // If user pressed resend OTP, then delete the previous OTP
    await this.deleteMany({ email });

    const otp = otpGenerator.generate(6);
    // Saving it to db
    const userOtp = await this.create({
        email,
        otp
    });

    return otp;
};

otpSchema.statics.verifyOTP = async function(email,otp){
    const userOtp = await this.findOne({email});
    if(!userOtp || userOtp.otp!== otp){
        return false;
    }
    return true;
}

otpSchema.statics.deleteOTP = async function(email){
    const userOtp = await this.findOne({email});
    if(userOtp){
        await this.findByIdAndDelete(userOtp._id);
    }
}

const OTP = mongoose.model("OTP",otpSchema);

module.exports = OTP;