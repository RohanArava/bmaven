const mongoose = require("mongoose")

const vendorSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true,
    },
    vendorName:{
        type:String,
        required:true,
    }, 
});

const Vendor = mongoose.model("vendor", vendorSchema)

module.exports = {Vendor}