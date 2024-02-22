import mongoose from "mongoose"
import User from "./user.model";
import Service from "./venderservices.model";
let ObjectId = mongoose.Schema.Types.ObjectId;
const historySchema = mongoose.Schema({
    user: {
        type: ObjectId,
        ref: User
    },
    name:{
        type:String,
    },
    service:{
        type:ObjectId,
        ref: Service
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
export default History;