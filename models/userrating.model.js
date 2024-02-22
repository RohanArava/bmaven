import mongoose from "mongoose"
import User from "./user.model"
import Service from "./service.model"
let ObjectId = mongoose.Schema.Types.ObjectId;
const ratingSchema = mongoose.Schema({
    user:{
        type:ObjectId,
        ref: User,
        required:true,
    },
    service:{
        type:ObjectId,
        ref: Service,
        required:true,
    },
    review:{
        type:String,
    },
    rating:{
        type:Number,
        required:true,
    },
});
const Rating = mongoose.model("rating",ratingSchema)
export default Rating