const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId;
const serviceReportSchema = mongoose.Schema({
    user:{
        type: ObjectId,
        ref: 'user'
    },
    service:{
        type: ObjectId,
        ref: 'service'
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
module.exports = {ServiceReport}