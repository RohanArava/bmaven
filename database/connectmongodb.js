import mongoose from "mongoose";

export default async  function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("Error connecting mongo db",error.message)
    }
}