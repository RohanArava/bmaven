import mongoose from "mongoose"
import User from "./user.model"
import Service from "./service.model"
let ObjectId = mongoose.Schema.Types.ObjectId;
const viewSchema = mongoose.Schema({
    user:{
        type:ObjectId,
        ref: User,
        required:true,
    },
    service:{
        type:ObjectId,
        ref: Service,
        required:true,
    },
});
const view = mongoose.model("view",viewSchema)
export default view