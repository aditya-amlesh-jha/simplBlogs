const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const otpVerify = async (req,res,next)=>{
    const token = req.headers.authorization;
    try{
        const {_id} = jwt.decode(token,process.env.SECRET_KEY_FOR_JWT_TOKENS);
        // find user with this id
        const user = await User.findById(_id);
        if(!user){
            throw Error("User not found");
        }
        req.body.email = user.email;

        next();
    }
    catch(error){
        console.log(error)
        res.sendStatus(404);
    }
}

module.exports = otpVerify;