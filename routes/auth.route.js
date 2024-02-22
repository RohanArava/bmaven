import express  from "express";
import usersignUp from "../controllers/usersignup.controller.js"
import vendorsignUp from "../controllers/vendorsignup.controller.js"
const router = express.Router()
//router.get("/user/sign",userSign);
router.post("/user/signup",usersignUp);

//router.get("/business/sign",businessSign);
router.post("/vendor/signup",vendorsignUp);

export default router;