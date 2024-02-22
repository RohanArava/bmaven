import express from "express"
import writereview from "../controllers/writereview.controller.js"

const router =  express.Router()

router.post('/review',writereview)

export default  router;