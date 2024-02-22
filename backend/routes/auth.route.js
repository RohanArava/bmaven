import express  from "express";
const router = express.Router()
import  userSign from "../controllers/usersign.controller.js"
import usersignUp from "../controllers/usersignup.controller.js"
import vendorsignUp from "../controllers/vendorsignup.controller.js"
import vendorSign from "../controllers/vendorsign.controller.js"

router.post("/user/sign",userSign);
router.post("/user/signup",usersignUp);

router.post("/vendor/sign",vendorSign);
router.post("/vendor/signup",vendorsignUp);

export  default router;