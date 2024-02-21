import  User from "../models/user.model.js";


export default async(req,res)=>{
    const newUser = new User(req.body)
    console.log(newUser)
    try {
        await newUser.save().then((newUser)=>{
            res.status(200).send(newUser);
        })
        
    } catch (error) {
        //redirect to login page
    }
    
}