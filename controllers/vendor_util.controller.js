const { Service } = require("../models/venderservices.model");
const { Order } = require("../models/order.model")
const {Rating} = require("../models/userrating.model")
const {View} = require("../models/view.model")
const mongoose = require("mongoose")
async function addService(req, res, next) {
    const serviceObj = {
        name: req.body.name,
        desc: req.body.desc,
        business: req.body.businessId,
        image: req.body.image,
        ppp: req.body.ppp,
        pdesc: req.body.pdesc,
    }
    console.log(serviceObj)
    // serviceObj.business = new ObjectId(req.body.business);
    const newService = new Service(serviceObj);
    try {
        let service = await newService.save();
        let services = await Service.find({ business: service.business });
        res.status(200).json({ services });
    } catch (err) {
        console.log(err)
        next(err)
    }
}
async function getServices(req, res, next) {
    try {
        const services = await Service.find({ business: req.params.id });
        console.log("here: ", services);
        res.status(200).json({ services, success: true });
    } catch (err) {
        console.log(err);
        next(err)
    }
}

async function deleteService(req, res, next) {
    const serviceId = req.params.id;
    try {
        let service = await Service.findByIdAndDelete(serviceId);
        let services = await Service.find({ business: service.business });
        res.json({ msg: "deleted", services })
    } catch (err) {
        next(err);
    }
}

async function getAllOrders(req, res, next) {
    const businessId = req.params.businessId;
    try {
        const orders = await Order.find({
            vendor: businessId,
        });
        res.json({ success: true, orders })
    } catch (err) {
        next(err)
    }
}

async function getUnacceptedUpcomingOrders(req, res, next) {
    const business = req.params.businessId;
    const date = Date.now();
    const accepted = false;
    try {
        const orders = await Order.find({
            vendor: business,
            date: {
                $gt: date
            },
            accepted
        });
        res.json({ success: true, orders })
    } catch (err) {
        next(err)
    }
}

async function getAcceptedUpcomingOrders(req, res, next) {
    const business = req.params.businessId;
    const date = Date.now();
    const accepted = true;
    try {
        const orders = await Order.find({
            vendor: business,
            date: {
                $gt: date
            },
            accepted
        });
        res.json({ success: true, orders })
    } catch (err) {
        next(err)
    }
}

async function acceptOrder(req, res, next) {
    const order_id = req.params.id;
    try {
        const order = await Order.findByIdAndUpdate(order_id, {
            accepted: true
        });
        res.send({success:true, order: order})
    }catch (err) {
        next(err)
    }
}
async function rejectOrder(req, res, next) {
    const order_id = req.params.id;
    try {
        const order = await Order.findByIdAndUpdate(order_id, {
            rejected: true
        });
        res.send({success:true, order: order})
    }catch (err) {
        next(err)
    }
}
async function getViewsForService(req, res, next){
    try{
        console.log(req.params.id)
        const id = req.params.id;
        const services = await Service.findById(id, {_id:1, ppp:1});
        const views = await View.aggregate([
            {$match: {service:services._id}},
            {$group: {_id: {$dayOfYear : "$_id"}, views: {$sum: 1}}}
        ]);
        const rating = await Rating.aggregate([
            {$match: {service:services._id}},
            {$group: {_id: {$dayOfYear : "$_id"}, rating: {$avg: "$rating"}}}
        ]);
        const orders = await Order.find({item: id});
        let revenue = 0;
        orders.forEach(order =>{
            revenue+= order.count * services.ppp})

        res.send({views, rating, revenue});
    }catch(err){
        next(err)
    }
}

async function getViewsForBusiness(req, res, next){
    try{
        console.log(req.params.id)
        const services = await Service.find({business: req.params.id}, {_id:1, ppp:1});
        const serviceIds = services.map(service => service._id)
        const servicePrices = new Map(services.map(service => [service._id.toString(), service.ppp]))
        const views = await View.aggregate([
            {$match: {service: {
                $in: serviceIds
            }}},
            {$group: {_id: {$dayOfYear : "$_id"}, views: {$sum: 1}}}
        ]);
        const rating = await Rating.aggregate([
            {$match: {service: {
                $in: serviceIds
            }}},
            {$group: {_id: {$dayOfYear : "$_id"}, rating: {$avg: "$rating"}}}
        ]);
        const orders = await Order.find({item: {
            $in: serviceIds
        }})
        let revenue = 0;
        console.log(servicePrices)
        orders.forEach(order =>{console.log(servicePrices.get(order.item.toString()))
            revenue+= order.count * servicePrices.get(order.item.toString())})

        res.send({views, rating, revenue});
    }catch(err){
        next(err)
    }
}

module.exports = {
    addService,
    getServices,
    acceptOrder,
    rejectOrder,
    getAllOrders,
    deleteService,
    getViewsForService,
    getViewsForBusiness,
    getAcceptedUpcomingOrders,
    getUnacceptedUpcomingOrders,
}