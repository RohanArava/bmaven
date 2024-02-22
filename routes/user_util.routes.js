const express = require("express");
const router = express.Router()
const { addCollection, removeCollection, searchServicebyTerm, searchServiceDefault, getService, writeReview} = require("../controllers/user_util.controller")
router.post('/addcoll', addCollection);
router.post('/removecoll', removeCollection);
router.get("/search/default", searchServiceDefault);
router.get("/search", searchServicebyTerm);
router.get("/getService/:id", getService);
router.post("/writeReview", writeReview);
module.exports = { router }; 