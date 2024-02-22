const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true,
    },
});

const User = mongoose.model("user", UserSchema)

module.exports = {User}