const express = require("express");
const router = express.Router()
const {addCollection, removeCollection, searchServicebyTerm, searchServiceDefault} = require("../controllers/user_util.controller")
router.post('/addcoll', addCollection)
router.post('/removecoll', removeCollection);
router.get("/search/default", searchServiceDefault)
router.get("/search", searchServicebyTerm)

module.exports = {router}; 