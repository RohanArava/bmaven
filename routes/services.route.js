const express = require("express")
const Service = require("../controllers/service.controller.js")

const router =  express.Router()

router.post('/service',Service)

module.exports = {router};