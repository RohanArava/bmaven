const {Service} = require("../models/venderservices.model");
const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;
async function addService(req, res){
    const serviceObj = {
        name: req.body.name,
        desc: req.body.description,
        business: req.body.businessId,
        image: ""
    }
    serviceObj.business = new ObjectId(req.body.business);
    const newService = new Service(serviceObj);
    try{
        let service = await newService.save();
        res.status(200).json({service});
    }catch(err){

    }
}

async function getServices(req, res){
    try{
    const services = await Service.find({business: req.params.id});
    console.log("here: ", services);
    res.status(200).json({services, success:true});
    }catch(err){
        console.log(err);
    }
}

async function deleteService(req, res){
    const serviceId = req.params.serviceId;
    try{
        await Service.deleteById(serviceId);
        res.json({msg: "deleted"})
    }catch(err){

    }
}

module.exports = {addService, deleteService, getServices}