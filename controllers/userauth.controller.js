const {User} = require("../models/user.model.js");
const {Collection} = require("../models/collection.model.js");
const {History} = require("../models/history.model.js");
async function userSignUp(req,res){
    const newUserObj = {
        email: req.body.email,
        password: req.body.password,
        userId: req.body.userId,
    };
    console.log(req.body)
    console.log(newUserObj);
    let user = await User.findOne({email: newUserObj.email});
    if(user){
        res.json({error: "This email already exists"})
        return;
    }
    const newUser = new User(newUserObj);
    console.log(newUser)
    try {
        let user = await newUser.save();
        res.status(200).send({user, collections:[], history: []});
    }
    catch(err){
        console.log(err)
    }
}

async function isUserIdAvailable(req, res){
    let user = await User.findOne({
        userId: req.query.userId
    });
    console.log(req.query.userId)
    if(user){
        res.json({is_available: false})
    }else{
        res.json({is_available: true})
    }
}

async function userSignIn(req, res){
    const userObj = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(userObj, req.body)
    User.findOne({email: userObj.email}).then(async (user) => {
        if(!user){
            res.json({error: "Email Not Found"});
            return;
        }
        if(user.password === userObj.password){
            console.log("here");
            let collections = await Collection.find({user: user._id});
            let history = await History.find({user: user._id});
            res.json({success: true,msg: "Successfully Logged In", user, collections, history})
        }
    })
}

module.exports = {
    userSignUp,
    userSignIn, 
    isUserIdAvailable
}