const {Vendor} = require("../models/vendor.model.js")
const {Service} = require("../models/venderservices.model.js")
async function vendorSignUp(req, res, next){
    const newVendorObj = {
        email: req.body.email,
        password: req.body.password,
        vendorName: req.body.vendorName
    };
    let vendor = await Vendor.findOne({email: newVendorObj.email});
    if(vendor){
        res.json({error: "This email already exists"})
        return;
    }
    const newUser = new Vendor(newVendorObj);
    console.log(newUser)
    try {
        let vendor = await newUser.save();
        res.status(200).send({vendor, services:[], offers:[]});
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

function vendorSignIn(req, res, next){
    const userObj = {
        email: req.body.email,
        password: req.body.password
    }
    try{
    Vendor.findOne({email: userObj.email}).then(async (user) => {
        if(!user){
            res.json({error: "Email Not Found"});
            return;
        }
        if(user.password === userObj.password){
            const services = await Service.find({business: user._id});
            res.json({success: true, msg: "Successfully Logged In", vendor: user, services, offers:[]})
        }
    })}catch(err){
        next(err);
    }
}

module.exports = {
    vendorSignIn, vendorSignUp
}