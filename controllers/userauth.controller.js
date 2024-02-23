const {User} = require("../models/user.model.js");
const {Collection} = require("../models/collection.model.js");
const {History} = require("../models/history.model.js");
const {Service} = require("../models/venderservices.model.js")
async function userSignUp(req,res, next){
    const newUserObj = {
        email: req.body.email,
        password: req.body.password,
        userId: req.body.userId,
    };
    console.log(req.body)
    console.log(newUserObj); 
    try{
        let userid = await User.findOne({
            userId: newUserObj.userId
        });
        if(userid){
            res.json({error: "This userId already exists"})
            return;
        } 

    let usere = await User.findOne({email: newUserObj.email});
    if(usere){
        res.json({error: "This email already exists"})
        return;
    }
    const newUser = new User(newUserObj);
    console.log(newUser)
        let user = await newUser.save();
        res.status(200).send({user, collections:[], history: []});
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

async function isUserIdAvailable(req, res, next){
    try{
    let user = await User.findOne({
        userId: req.query.userId
    });
    console.log(req.query.userId)
    if(user){
        res.json({is_available: false})
    }else{
        res.json({is_available: true})
    }}catch(err){
        next(err)
    }
}

async function userSignIn(req, res, next){
    const userObj = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(userObj, req.body)
    try{
    User.findOne({email: userObj.email}).then(async (user) => {
        if(!user){
            res.json({error: "Email Not Found"});
            return;
        }
        if(user.password === userObj.password){
            console.log("here");
            let collections = await Collection.find({user: user._id});
            for(let i = 0; i < collections.length; i++){
                let itemIds = collections[i].items;
                let items = []
                for (let j=0; j < itemIds.length; j++){
                    let item = await Service.findById(itemIds[j])
                    if(item){
                    let itemObj = {}
                    itemObj._id = item._id;
                    itemObj.name = item.name;
                    itemObj.image = item.image;
                    items.push({item: itemObj});
                    console.log(items)
                    }
                }
                collections[i].items_1 = items;
            }
            console.log(collections)
            let history = await History.find({user: user._id});
            res.json({success: true,msg: "Successfully Logged In", user, collections, history})
        }
    })}catch(err){
        next(err);
    }
}

module.exports = {
    userSignUp,
    userSignIn, 
    isUserIdAvailable
}