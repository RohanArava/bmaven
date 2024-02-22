import  User from "../models/user.model.js";


export  async function userSignUp(req,res){
    const newUserObj = {
        email: req.body.email,
        password: req.body.password,
        userId: req.body.userId,
    };
    let count = await User.count({email: newUserObj.email});
    if(count > 0){
        res.json({error: "This email already exists"})
        return;
    }
    const newUser = new User(newUserObj);
    console.log(newUser)
    try {
        let user = await newUser.save();
        res.status(200).send({user});
    }
    catch(err){

    }
}

export async function isUserIdAvailable(req, res){
    User.count({
        userId: req.params.userId
    },(err, count)=>{
        if(err){
            return res.json({error: "Something went wrong"})
        }
        if(count > 0){
            res.json({is_available: false})
        }else{
            res.json({is_available: true})
        }
    });

}

export function userSignIn(req, res){
    const userObj = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({email: userObj.email}, (err, user) => {
        if(err) {}
        if(!user){
            res.json({error: "Email Not Found"});
            return;
        }
        if(user.password === userObj.password){
            res.json({msg: "Successfully Logged In", user})
        }
    })
}