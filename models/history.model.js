const mongoose = require("mongoose")
const User =require("./user.model") ;
const Service= require("./venderservices.model") ;
let ObjectId = mongoose.Schema.Types.ObjectId;
const historySchema = mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
    },
    service:{
        type:ObjectId,
        ref: 'service'
    },
    serviceName:{
        type:String,
    },
    servicePrice:{
        type:Number,
    },
    serviceTime:{
        type: Date,
    },
    paymentMethod:{
        type:String,
    },
    paymentId:{
        type:String,
    },
    description:{
        type:String,
    }

},)
const History = mongoose.model('history', historySchema);
module.exports = {History};