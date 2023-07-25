const jwt = require("jsonwebtoken")

const verifyLogin = async (req,res,next)=>{
    const token = req.headers.authorization;
    try{
        const {_id} = jwt.decode(token,process.env.SECRET_KEY_FOR_JWT_TOKENS);
        req._id = _id;
        next();
    }
    catch(error){
        console.log(error)
        res.sendStatus(404);
    }
}

module.exports = verifyLogin