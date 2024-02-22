const {Service} = require("../models/venderservices.model");
const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;
async function addService(req, res){
    const serviceObj = {
        name: req.body.name,
        desc: req.body.desc,
        business: req.body.businessId,
        image: req.body.image,
    }
    console.log(serviceObj)
    // serviceObj.business = new ObjectId(req.body.business);
    const newService = new Service(serviceObj);
    try{
        let service = await newService.save();
        let services = await Service.find({business: service.business});
        res.status(200).json({services});
    }catch(err){
        console.log(err)
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
    const serviceId = req.params.id;
    try{
        let service = await Service.findByIdAndDelete(serviceId);
        let services = await Service.find({business: service.business});
        res.json({msg: "deleted", services})
    }catch(err){

    }
}

module.exports = {addService, deleteService, getServices}