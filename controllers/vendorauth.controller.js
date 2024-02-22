import Vendor from "../models/vendor.model.js"

export async function vendorSignUp(req, res){
    const newVendorObj = {
        email: req.body.email,
        password: req.body.password,
        vendorName: req.body.vendorName
    };
    let count = await Vendor.count({email: newVendorObj.email});
    if(count > 0){
        res.json({error: "This email already exists"})
        return;
    }
    const newUser = new Vendor(newVendorObj);
    console.log(newUser)
    try {
        let vendor = await newUser.save()
        res.status(200).send({vendor});
    }
    catch(err){

    }
}

export function vendorSignIn(req, res){
    const userObj = {
        email: req.body.email,
        password: req.body.password
    }
    Vendor.findOne({email: userObj.email}, (err, user) => {
        if(err) {}
        if(!user){
            res.json({error: "Email Not Found"});
            return;
        }
        if(user.password === userObj.password){
            res.json({msg: "Successfully Logged In", ...user})
        }
    })
}