import express  from "express";
const router = express.Router()
import usersignUp from "../controllers/usersignup.controller.js"
import vendorsignUp from "../controllers/vendorsignup.controller.js"
//router.get("/user/sign",userSign);
router.post("/user/signup",usersignUp);

//router.get("/business/sign",businessSign);
router.post("/vendor/signup",vendorsignUp);

export  default router;