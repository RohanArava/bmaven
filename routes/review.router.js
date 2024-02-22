const express = require("express")
const writereview = require("../controllers/writereview.controller.js")

const router =  express.Router()

router.post('/review',writereview)
module.exports = {router};