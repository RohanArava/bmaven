import Vendor from "../models/vendor.model.js"

export default async(req,res)=>{
    const newVendor = new Vendor(req.body)
    console.log(newVendor)
    try{
        await  newVendor.save().then((newVendor)=>{
            res.status(200).send(newVendor)
        })
    } catch(erorr){

    }
}