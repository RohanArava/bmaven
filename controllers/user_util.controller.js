const {Rating} = require("../models/userrating.model.js") 
const {User} = require("../models/user.model.js")
const {Collection} = require("../models/collection.model.js")
const {Service} = require("../models/venderservices.model.js")
const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;
async function writeReview(req,res){
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

async function addCollection(req, res){
    const newCollectionObj = {
        user: req.body.userId,
        name: req.body.name,
        items: []
    };
    const user = await User.findOne({userId: newCollectionObj.user});
    newCollectionObj.user = user._id;
    const newCollection = new Collection(newCollectionObj);
    try{
        let collection = await newCollection.save();
        let collections = await Collection.find({user: collection.user})
        res.json({success: true, collections});
    }catch(err){
        console.log(err)
    }
}

async function removeCollection(req, res){
    try{
        let collection = await Collection.findByIdAndDelete(req.body.collID);
        let collections = await Collection.find({user: collection.user});
        res.json({success: true, collections});
    }catch(err){
        console.log(err)
    }
}

async function searchServicebyTerm(req, res){
    const searchTerm = req.query.q;
    const re = searchTerm;
    try{
        let services = await Service.find({name: {
            $regex: re
        }});
        res.json({success:true, services});
    }catch(err){
        console.log(err)
    }
}
async function searchServiceDefault(req, res){
    const re = "*";
    try{
        let services = await Service.find({name: {
            $regex: re
        }});
        res.json({success:true, services});
    }catch(err){
        console.log(err)
    }
}
module.exports = {writeReview, addCollection, removeCollection, searchServicebyTerm, searchServiceDefault}
// export async function getServices(req, res){
//     const service_name = req.params.serviceName;

// }