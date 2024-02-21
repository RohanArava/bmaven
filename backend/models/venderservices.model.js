import mongoose from "mongoose";

const service = mongoose.Schema({
    serviceid:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    business:{
        type:String,
        required:true,
    },
    phno:{
        type:Number,
        required:true,
        unique:true,

    },
    image:{
        type:String,
        required:true,
    }
})