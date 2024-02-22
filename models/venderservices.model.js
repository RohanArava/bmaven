import mongoose from "mongoose";
import Vendor from "./vendor.model";
let ObjectId = mongoose.Schema.Types.ObjectId;
const service = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    business:{
        type:ObjectId,
        ref: Vendor
    },
    image:{
        type:String,
    }
})

const Service = mongoose.model("service", service)
export default Service