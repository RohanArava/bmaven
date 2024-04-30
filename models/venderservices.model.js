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
    },
    ppp:{
        type: Number,
    },
    pdesc:{
        type:String
    }
});
service.index({name:"text", desc: "text"}, {weights: {name:3, desc:1}})
const Service = mongoose.model("service", service)
module.exports = {Service}