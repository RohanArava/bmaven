const express = require("express");
const router = express.Router()
const { addCollection, removeCollection, searchServicebyTerm, searchServiceDefault, getService, writeReview, addToCollection, getCollection, buyService} = require("../controllers/user_util.controller")
router.use(function(req, res, next){
    console.log("USERUTIL REQUEST AT", Date.now());
    next()
});
router.post('/addcoll', addCollection);
router.post('/removecoll', removeCollection);
router.get("/search/default", searchServiceDefault);
router.get("/search", searchServicebyTerm);
router.get("/getService/:id", getService);
router.post("/writeReview", writeReview);
router.get("/addToCollection/:collectionId/:serviceId", addToCollection);
router.get("/getCollection/:id", getCollection)
router.post("/buyService", buyService)

module.exports = { router }; 