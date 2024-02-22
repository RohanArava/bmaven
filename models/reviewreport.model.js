const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId;
const reviewReportSchema = mongoose.Schema({
    review: {
        type: ObjectId,
        ref: 'rating'
    },
    cause:{
        type: String,
        required: true
    },
    additional_info:{
        type: String
    }
},)
const ReviewReport = mongoose.model('reviewreport', reviewReportSchema);
module.exports = {ReviewReport}