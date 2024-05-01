const express = require("express")
const router = express.Router()
const { Rating } = require("../models/userrating.model.js")
const { User } = require("../models/user.model.js")
const { Collection } = require("../models/collection.model.js")
const { History } = require("../models/history.model.js")
const { Service } = require("../models/venderservices.model.js")
const { Vendor } = require("../models/vendor.model.js")
const { Order } = require("../models/order.model.js")
const { View } = require("../models/view.model.js")
const { ServiceReport } = require("../models/servicereport.model.js")
const { Notification } = require("../models/notification.model.js")
const { createClient } = require("redis");
let redisClient = undefined;
createClient({
    password: 'J5PEL3zxZPAfecNWmtraeathLuLKqwqo',
    socket: {
        host: 'redis-13798.c17.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 13798
    }
}).on('error', err => console.log('Redis Client Error', err))
    .connect().then((client) => {
        console.log("Redis client connected")
        redisClient = client
    });
router.get('/users', async (req, res, next) => {
    try {
        let users = await User.find({}, { _id: 1, email: 1, userId: 1 });
        res.status(200).send({ users });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/user/collections/:userId', async (req, res, next) => {
    try {
        let collections = await Collection.find({ user: req.params.userId }, { _id: 1, name: 1 });
        if (!collections || collections.length === 0) {
            res.status(404).send("Couldn't find collections");
        } else {
            res.status(200).send({ collections })
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/user/orders/:userId', async (req, res, next) => {
    try {
        let orders = await Order.find({ user: req.params.userId }, { _id: 1, item: 1, count: 1 });
        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: 'Order not found' });
        } else {
            return res.status(200).send({ orders });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/user/:id', async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id, { password: 0 });
        if (user) {
            res.status(200).send({ user });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" })
    }
});
router.get('/collections', async (req, res, next) => {
    try {
        let collections = await Collection.find({}, { _id: 1, name: 1 });
        res.status(200).send({ collections });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});
router.get('/collection/:collectionId', async (req, res, next) => {
    try {
        let collection = await Collection.findById(req.params.collectionId);
        if (collection) {
            res.status(200).send({ collection });
        } else {
            res.status(404).send({ message: 'Collection not found' });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
// router.get('/notifications/from/:fromId', async (req, res, next) => {
//     try{
//         let notifications = await Notification.find({from: req.params.fromId});
//         if(!notifications || notifications.length===0){
//             res.status(404).send({message: "Couldn't find notifications"});
//         }else{
//             res.status(200).send({notifications});
//         }
//     }catch(err){
//         res.errmsg = "Internal Server Error";
// next(err);
//     }
// });
// router.get('/notifications/to/:toId', async (req, res, next) => {
//     try{
//         let notifications = await Notification.find({to: req.params.toId});
//         if(!notifications || notifications.length===0){
//             res.status(404).send({message: "Couldn't find notifications"});
//         }else{
//             res.status(200).send({notifications});
//         }
//     }catch(err){
//         res.errmsg = "Internal Server Error";
// next(err);
//     }
// });
router.get('/orders', async (req, res, next) => {
    try {
        let orders = await Order.find({}, { _id: 1, item: 1 });
        res.status(200).send({ orders });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});
router.get('/order/:orderId', async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.orderId);
        if (order) {
            res.status(200).send({ order });
        } else {
            res.status(404).send({ message: "Couldn't find order" });
        }
    } catch (err) {
        res.send({ message: "Internal Server Error" });
    }
});
router.get('/vendors', async (req, res, next) => {
    try {
        let vendors = await Vendor.find({}, { _id: 1, email: 1, vendorName: 1 });
        res.status(200).send({ vendors });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/vendor/orders/:vendorId', async (req, res, next) => {
    try {
        let orders = await Order.find({ vendor: req.params.vendorId }, { _id: 1, item: 1, count: 1 });
        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: 'Order not found' });
        } else {
            return res.status(200).send({ orders });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/vendor/services/:vendorId', async (req, res, next) => {
    try {
        let services = await Service.find({ business: req.params.vendorId });
        if (!services || services.length === 0) {
            req.status(404).send({ message: 'Could not find services' });
        } else {
            req.status(200).send({ services });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/vendor/:vendorId', async (req, res, next) => {
    try {
        let vendor = await Vendor.findById(req.params.vendorId);
        if (!vendor) {
            res.status(404).send({ message: "Couldn't find vendor" });
        } else {
            res.status(200).send({ vendor });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/services', async (req, res, next) => {
    try {
        let services = Service.find({}, { _id: 1, name: 1 });
        res.status(200).send({ services });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/service/:serviceId', async (req, res, next) => {
    try {
        let service = await Service.findById(req.params.serviceId);
        if (!service) { res.status(404).send({ message: "Service not found" }); }
        else {
            res.status(200).send({ service });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/service/orders/:serviceId', async (req, res, next) => {
    try {
        let orders = await Order.find({ item: req.params.serviceId }, { _id: 1, item: 1, date: 1 });
        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: 'Order not found' });
        } else {
            return res.status(200).send({ orders });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/reviews', async (req, res, next) => {
    try {
        let reviews = await Rating.find({}, { _id: 1, service: 1 });
        res.status(200).send({ reviews });
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.get('/review/:reviewId', async (req, res, next) => {
    try {
        let review = await Rating.findById(req.params.reviewId);
        if (!review) {
            res.status(404).send({ message: "Internal Server Error" });
        } else {
            res.status(200).send({ review });
        }
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.get('/reviews/from/:fromId', async (req, res, next) => {
    try {
        let reviews = await Rating.find({ user: req.params.fromId });
        if (!reviews || reviews.length === 0) {
            res.status(404).send({ message: "Could not find reviews" });
        } else {
            res.status(200).send({ reviews });
        }
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.get('/reviews/to/:toId', async (req, res, next) => {
    try {
        let reviews = await Rating.find({ service: req.params.toId });
        if (!reviews || reviews.length === 0) {
            res.status(404).send({ message: "Could not find reviews" });
        } else {
            res.status(200).send({ reviews });
        }
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.get("/search", async (req, res, next) => {
    try {
        let term = req.query.term || "";
        console.log(term)
        if (term !== "") {
            let resJSON = await redisClient.get(term);
            if (resJSON) {
                console.log("in redis:", resJSON)
                let services = JSON.parse(resJSON)
                if (services.length === 0) {
                    console.log("length 0")
                    services = await Service.find({ $text: { $search: term } }).sort({ score: { $meta: 'textScore' } });
                    if (services.length !== 0)
                        await redisClient.set(term, JSON.stringify(services));
                    res.status(200).send({ services: services || [] })
                    return;
                }
                res.status(200).send({ services: services || [] });
                return;
            } else {
                console.log("Not found in redis:", term, ":", resJSON)
            }
        }
        let services = await Service.find({ $text: { $search: term } }).sort({ score: { $meta: 'textScore' } });
        if (services.length !== 0)
            await redisClient.set(term, JSON.stringify(services));
        res.status(200).send({ services: services || [] })
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});

router.post('/user', async (req, res, next) => {
    try {
        const newUserObj = {
            email: req.body.email,
            password: req.body.password,
            userId: req.body.userId,
        };
        console.log(newUserObj);
        let userid = await User.findOne({
            userId: newUserObj.userId
        });
        if (userid) {
            res.status(500).json({ message: "This userId already exists" })
            return;
        }

        let usere = await User.findOne({ email: newUserObj.email });
        if (usere) {
            res.status(500).send({ message: "This email already exists" })
            return;
        }
        const newUser = new User(newUserObj);
        let user = await newUser.save();
        res.status(200).send({ user });
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.post('user/collection/service/:collectionId/:serviceId', async (req, res, next) => { });
router.post('/user/collection/:userId', async (req, res, next) => { });
router.post('/notification', async (req, res, next) => { });
router.post('/order', async (req, res, next) => { });
router.post('/review', async (req, res, next) => { });
router.post('/vendor', async (req, res, next) => { });
router.post('/vendor/service/:vendorId', async (req, res, next) => { });
router.post('review', async (req, res, next) => { });


router.put('/user', async (req, res, next) => { });
router.put('/vendor', async (req, res, next) => { });
router.put('/service/:serviceId', async (req, res, next) => { });


router.delete('/user/:userId', async (req, res, next) => { });
router.delete('/user/:userId/collection/:userId/:collectionId', async (req, res, next) => { });
router.delete('/user/collection/service/:userId/:collectionId/:serviceId', async (req, res, next) => { });
router.delete('/vendor/:vendorId', async (req, res, next) => { });
router.delete('/service/:serviceId', async (req, res, next) => { });
router.delete('/order/:orderId', async (req, res, next) => { });
router.delete('/review/:reviewId', async (req, res, next) => { });

module.exports = { router }