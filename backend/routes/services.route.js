import express from "express"
import Service from "../controllers/service.controller.js"

const router =  express.Router()

router.post('/service',Service)

export default  router;