import  Vendor from "../models/vendor.model.js";

export default async(req,res)=>{   
    const {email,password} = req.body
    try{
        const vendor = await Vendor.findOne({email})
        console.log(password == vendor.password)
        if(!vendor){
            return res.status(401).json({ error: 'Invalid credentials' });
        }else if(password == vendor.password){
            return res.status(200).send(vendor)
        } else{
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }catch(error){
        console.log(error);
    }
}