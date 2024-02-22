const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId;
const ratingSchema = mongoose.Schema({
    user:{
        type:ObjectId,
        ref: 'user',
        required:true,
    },
    service:{
        type:ObjectId,
        ref: 'service',
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
module.exports = {Rating}