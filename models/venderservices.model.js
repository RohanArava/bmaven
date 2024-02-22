const mongoose = require("mongoose")
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
        ref: 'vendor'
    },
    image:{
        type:String,
    }
})

const Service = mongoose.model("service", service)
module.exports = {Service}