import Rating from "../models/userrating.model.js" 
import mongoose from "mongoose";
let ObjectId = mongoose.Schema.Types.ObjectId;
export async function WriteReview(req,res){
    const newRatingObj = {
        user: req.body.userId,
        service: req.body.serviceId,
        review: req.body.review,
        rating: req.body.rating,
    }
    newRatingObj.user = new ObjectId(newRatingObj.user);
    newRatingObj.service = new ObjectId(newRatingObj.service);
    const newRating = new Rating(newRatingObj);
    console.log(newRating)
    try{
        await  newRating.save().then((newRating)=>{
            res.status(200).send({msg: "review added successfully" ,...newRating})
        })
    } catch(erorr){
        
    }
}

// export async function getServices(req, res){
//     const service_name = req.params.serviceName;

// }