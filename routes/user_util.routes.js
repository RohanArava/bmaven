const express = require("express");
const router = express.Router()
const {addCollection, removeCollection} = require("../controllers/user_util.controller")
router.post('/addcoll', addCollection)
router.post('/removecoll', removeCollection);
module.exports = {router}; 