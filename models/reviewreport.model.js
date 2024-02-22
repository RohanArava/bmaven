import mongoose from "mongoose"
import Rating from "./userrating.model";
let ObjectId = mongoose.Schema.Types.ObjectId;
const reviewReportSchema = mongoose.Schema({
    review: {
        type: ObjectId,
        ref: Rating
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
export default ReviewReport