import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import reviewRouter from  "./routes/review.router.js";
import connectMongoDB from "./database/connectmongodb.js";

const app = express()
dotenv.config();

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRouter)

app.use("/api",reviewRouter)
connectMongoDB().then(() => { console.log("")
app.listen(process.env.PORT, () => {
    console.log("Server listening on port:", +process.env.PORT)
})
}).catch(console.log)

   