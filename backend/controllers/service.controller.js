import Service from "../models/venderservices.model" 

export default async(req,res)=>{
    const newService = new Service(req.body)
    console.log (newService)
    try{
        await  newService.save().then((newService)=>{
            res.status(200).send(newService)
        })
    } catch(erorr){

    }
}