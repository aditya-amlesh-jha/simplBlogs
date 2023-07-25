const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createToken = (_id,check)=>{
    if(check === true){
        return jwt.sign({_id:_id},process.env.SECRET_KEY_FOR_JWT_TOKENS,{expiresIn: '30d'});
    }
    else{
        return jwt.sign({_id:_id},process.env.SECRET_KEY_FOR_JWT_TOKENS,{expiresIn: '1d'});
    }
}

module.exports.signup = async (req,res)=>{
    const {name,email,password} = req.body;

    try{
        const user = await User.signup(name,email,password);

        res.status(200).json({email,user});
    }
    catch(err){
        console.log(err);
        res.status(400).json({err: err.message});
    }
}

module.exports.login = async (req,res)=>{
    const {email,password,check} = req.body;

    try{
        const user = await User.login(email,password);
        const token = createToken(user._id,check);

        res.status(200).json({email,token});
    }
    catch(err){
        console.log(err);
        res.status(400).json({err: err.message});
    }
}

module.exports.verifyLogin = async (req,res)=>{
    const token = req.headers.authorization;
    try{
        const {_id} = jwt.decode(token,process.env.SECRET_KEY_FOR_JWT_TOKENS);
        res.status(200).json({message:"VALID TOKEN"});
    }
    catch(error){
        res.status(404).json({message:"INVALID TOKEN"});
    }
}
