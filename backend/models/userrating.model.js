import mongoose from "mongoose"
const ratingSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique:true,
    },
    service_id:{
        type:Number,
        required:true,
        unique:true,
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