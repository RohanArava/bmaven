const express = require("express");
const router = express.Router()
const {getServices, addService, deleteService} = require("../controllers/vendor_util.controller")
router.use(function(req, res, next){
    console.log("VENDORUTIL REQUEST AT", Date.now());
    next()
});
router.get('/getServices/:id', getServices);
router.post("/addService", addService);
router.get("/deleteService/:id", deleteService);
module.exports = {router}; 