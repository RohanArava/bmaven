import Rating from "../models/userrating.model.js" 

export default async(req,res)=>{
    const newRating = new Rating(req.body)
    console.log(newRating)
    try{
        await  newRating.save().then((newRating)=>{
            res.status(200).send(newRating)
        })
    } catch(erorr){

    }
}