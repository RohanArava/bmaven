import mongoose from "mongoose"

const vendorSchema = mongoose.Schema({
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
    userName:{
        type:String,
        required:true,
        unique:true,
    }, 
});

const Vendor = mongoose.model("vendor", vendorSchema)

export default Vendor