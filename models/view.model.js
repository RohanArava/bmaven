const mongoose = require("mongoose")
const User = require("./user.model")
const Service = require("./venderservices.model")
let ObjectId = mongoose.Schema.Types.ObjectId;
const viewSchema = mongoose.Schema({
    user:{
        type:ObjectId,
        ref: 'user',
        // required:true,
    },
    service:{
        type:ObjectId,
        ref: 'service',
        required:true,
    },
});
const View = mongoose.model("view",viewSchema)
module.exports = {View}