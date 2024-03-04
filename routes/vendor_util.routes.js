const express = require("express");
const router = express.Router()
const {getServices, addService, deleteService, getAcceptedUpcomingOrders, getUnacceptedUpcomingOrders, getViewsForService, getViewsForBusiness, acceptOrder, rejectOrder} = require("../controllers/vendor_util.controller")
router.use(function(req, res, next){
    console.log("VENDORUTIL REQUEST AT", Date.now());
    next()
});
router.get('/getServices/:id', getServices);
router.post("/addService", addService);
router.get("/deleteService/:id", deleteService);
router.get("/upcomingAccepted/:businessId", getAcceptedUpcomingOrders);
router.get("/upcomingUnaccepted/:businessId", getUnacceptedUpcomingOrders);
router.get("/viewsForService/:id", getViewsForService);
router.get("/viewsForBusiness/:id", getViewsForBusiness);
router.get("/acceptOrder/:id", acceptOrder);
router.get("/rejectOrder/:id", rejectOrder);
module.exports = {router}; 