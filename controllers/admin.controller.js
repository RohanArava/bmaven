const { Admin } = require("../models/admin.model")
const { User } = require("../models/user.model")
const { Vendor } = require("../models/vendor.model")
const {ServiceReport} = require("../models/servicereport.model")
const {View} = require("../models/view.model")
async function createadmin(req,res){
    const credentials ={
        
        email: req.body.email,
        password: req.body.password
    }
    const newadmin = new Admin(credentials)
    try {
        await newadmin.save()
        res.send("successfull")
    } catch (error) {
        
    }
}
async function getUsers(req,res){
    const users= await User.find({});
    res.json({"users":users})
}
async function getVendors(req,res){
    const vendors = await Vendor.find({});
    res.json({"vendors":vendors})
}
async function adminlogin(req,res){
    const credentials ={
        email: req.body.email,
        password: req.body.password
    }
    console.log(credentials, req.body)
    try {
        Admin.findOne({email: credentials.email}).then(async(admin)=>{
            if(!admin){
                res.json({error:"Invalid credentials"})
                return;
            }
            if(admin.password !== credentials.password){
                res.json({error:"Invalid credentials"})
                return;
            }else{
                res.json({})
            }
        })
    } catch (error) {
        
    }   
}

async function getReports(req, res, next){
    const reports = await ServiceReport.find()
    const users = (await User.find()).length
    const vendors = (await Vendor.find()).length
    const views = (await View.find()).length
    const viewGraph = await View.aggregate([
        {$group: {_id: {$dayOfYear : "$_id"}, views: {$sum: 1}}}
    ]);
    res.json({reports, stats:{users, vendors, views, viewGraph}});
}

async function removeuser(req,res){
    let userid = req.body.id
    console.log(userid)

    await User.findByIdAndDelete(userid)
    res.json({"user  removed":"successfully"});
}

async function  vendorremove(req,res){
    let vendorid = req.body.id
    
    await Vendor.findByIdAndDelete(vendorid)
    res.json({"vendor removed":"successfull"})
}
module.exports={
    adminlogin,
    removeuser,
    vendorremove,
    createadmin,    
    getUsers,
    getVendors,
    getReports,
}