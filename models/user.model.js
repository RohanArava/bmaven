import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true,
    },
});

const User = mongoose.model("user", UserSchema)

export default User