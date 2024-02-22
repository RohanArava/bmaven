import mongoose from "mongoose"
import User from "./user.model";
import Service from "./venderservices.model";
let ObjectId = mongoose.Schema.Types.ObjectId;
const serviceReportSchema = mongoose.Schema({
    user:{
        type: ObjectId,
        ref: User
    },
    service:{
        type: ObjectId,
        ref: Service
    },
    cause:{
        type: String,
        required: true
    },
    additional_info:{
        type: String
    }
},)
const ServiceReport = mongoose.model('servicereport', serviceReportSchema);
export default ServiceReport