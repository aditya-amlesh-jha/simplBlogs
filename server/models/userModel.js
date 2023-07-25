const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:false,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
}, {timestamps: true});


// static signup method
// cannot use arrow function because we need to use this
userSchema.statics.signup = async function(name, email, password){
    const exists = await this.findOne({email});
    if(exists){
        throw Error("Email already in use")
    }
    // salt adds random characters to the password
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hash = await bcrypt.hash(password,salt);

    // creating a new user
    const user = await this.create({
        name,
        email,
        password: hash,
    })

    return user;
}

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(!user){
        throw Error("Email does not exist")
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        throw Error("Incorrect password");
    }
    return user;
}

userSchema.statics.changePassword = async function(email,password){
    const user = await this.findOne({email});
    if(!user){
        throw Error("Email does not exist")
    }
    // salt adds random characters to the password
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hash = await bcrypt.hash(password,salt);

    user.password = hash;
    await user.save();
    return user;
}

const User = mongoose.model("User",userSchema);

module.exports = User;
