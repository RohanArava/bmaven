const express = require("express");
const router = express.Router()
const {getServices, addService, deleteService} = require("../controllers/vendor_util.controller")
router.get('/getServices/:id', getServices);
router.post("/addService", addService);
router.get("/deleteService/:id", deleteService);
module.exports = {router}; 