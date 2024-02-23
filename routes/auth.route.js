const express = require("express");
const {userSignUp, userSignIn, isUserIdAvailable} = require("../controllers/userauth.controller.js")
const {vendorSignUp, vendorSignIn} = require("../controllers/vendorauth.controller.js")
const router = express.Router()
router.use((req, res, next)=>{
    console.log("AUTHENTICATION REQUEST AT", Date.now());
    next()
})
//router.get("/user/sign",userSign);
router.post("/user/signup",userSignUp);
router.post("/user/signin",userSignIn);
router.get("/user/userIdAvail",isUserIdAvailable);
//router.get("/business/sign",businessSign);
router.post("/vendor/signup",vendorSignUp);
router.post("/vendor/signin",vendorSignIn);

module.exports = {router}