const { Rating } = require("../models/userrating.model.js")
const { User } = require("../models/user.model.js")
const { Collection } = require("../models/collection.model.js")
const { Service } = require("../models/venderservices.model.js")
const { Vendor } = require("../models/vendor.model.js")
// const mongoose = require("mongoose");
// let ObjectId = mongoose.Schema.Types.ObjectId;
async function writeReview(req, res, next) {
    const newRatingObj = {
        user: req.body.userId,
        service: req.body.serviceId,
        review: req.body.review,
        rating: req.body.rating,
    }
    console.log(newRatingObj)
    const user = await User.findOne({ userId: newRatingObj.user });

    newRatingObj.user = user._id;
    // newRatingObj.service = new ObjectId(newRatingObj.service);
    const newRating = new Rating(newRatingObj);
    console.log(newRatingObj)
    try {
        newRating.save().then((newRating) => {
            res.status(200).send({ msg: "review added successfully", review: newRating })
        })
    } catch (err) {
        next(err)
    }
}

async function addCollection(req, res, next) {
    const newCollectionObj = {
        user: req.body.userId,
        name: req.body.name,
        items: []
    };
    const user = await User.findOne({ userId: newCollectionObj.user });
    newCollectionObj.user = user._id;
    const newCollection = new Collection(newCollectionObj);
    try {
        let collection = await newCollection.save();
        let collections = await Collection.find({ user: collection.user })
        res.json({ success: true, collections });
    } catch (err) {
        console.log(err)
        next(err)
    }
}

async function addToCollection(req, res, next) {
    try {
        const collectionId = req.params.collectionId;
        const serviceId = req.params.serviceId;
        const collection = await Collection.findById(collectionId);
        collection.items.push(serviceId);
        await collection.save();
        let collections = await Collection.find({ user: collection.user })
        res.json({success: true, collections})
    }catch(err){
        console.log(err);
        next(err)
    }
}

async function removeCollection(req, res, next) {
    try {
        let collection = await Collection.findByIdAndDelete(req.body.collID);
        let collections = await Collection.find({ user: collection.user });
        res.json({ success: true, collections });
    } catch (err) {
        console.log(err)
        next(err)
    }
}

async function searchServicebyTerm(req, res, next) {
    const searchTerm = req.query.q;
    const re = searchTerm;
    try {
        let services = await Service.find({
            name: {
                $regex: re,
                $options: "i"
            }
        });
        res.json({ success: true, services });
    } catch (err) {
        console.log(err)
        next(err)
    }
}
async function searchServiceDefault(req, res, next) {
    const re = "";
    try {
        let services = await Service.find({
            name: {
                $regex: re
            }
        });
        res.json({ success: true, services });
    } catch (err) {
        console.log(err)
        next(err)
    }
}

async function getService(req, res, next) {
    const serviceId = req.params.id;
    try {
        let service = await Service.findById(serviceId);
        let reviews = await Rating.find({ service: service._id });
        let num_ratings = reviews.length;
        let rating_sum = 0;
        if (num_ratings > 0) {

            reviews.forEach((review) => {
                rating_sum += review.rating
            })
            for (let i = 0; i < num_ratings; i++) {
                const user = await User.findById(reviews[i].user);
                console.log(user.userId)
                reviews[i] = { ...reviews[i]._doc, user: user.userId };
            }
            // reviews = reviews.map(async(review)=>{
            //     const user = await User.findById(review.user);
            //     return {...review, user: user.userId}
            // })
            console.log(reviews)
        }

        let rating = num_ratings === 0 ? 0 : rating_sum / num_ratings;
        let business = await Vendor.findById(service.business);
        res.json({ service, rating, num_ratings, reviews, business: business.vendorName, email: business.email });
    } catch (err) {
        console.log(err);
        next(err)
    }
}
module.exports = { writeReview, addCollection, removeCollection, searchServicebyTerm, searchServiceDefault, getService, addToCollection }
// export async function getServices(req, res){
//     const service_name = req.params.serviceName;

// }