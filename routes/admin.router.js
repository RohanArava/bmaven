const express = require("express")
const { adminlogin, removeuser, vendorremove, createadmin, getUsers, getVendors, getReports} = require("../controllers/admin.controller")
const router = express.Router()

router.post("/login",adminlogin)
router.post("/create",createadmin)
router.post("/removeuser",removeuser)
router.post("/removevendor",vendorremove)
router.get("/getusers",getUsers)
router.get("/getvendors",getVendors) 
router.get("/getReports", getReports)
module.exports={router}  //export the module to be used in server.js