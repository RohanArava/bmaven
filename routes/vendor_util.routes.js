const express = require("express");
const router = express.Router()
const {getServices, addService} = require("../controllers/vendor_util.controller")
router.get('/getServices/:id', getServices);
router.post("/addService", addService);
module.exports = {router}; 