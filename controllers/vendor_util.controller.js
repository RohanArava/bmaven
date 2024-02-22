import Service from "../models/venderservices.model";
import mongoose from "mongoose";

let ObjectId = mongoose.Schema.Types.ObjectId;
export async function addService(req, res){
    const serviceObj = {
        name: req.body.name,
        desc: req.body.description,
        business: req.body.businessId,
        image: req.body.image
    }
    serviceObj.business = new ObjectId(req.body.business);
    const newService = new Service(serviceObj);
    try{
        let service = await newService.save();
        res.status(200).json({service});
    }catch(err){

    }
}

export async function deleteService(req, res){
    const serviceId = req.params.serviceId;
    try{
        await Service.deleteById(serviceId);
        res.json({msg: "deleted"})
    }catch(err){

    }
}

