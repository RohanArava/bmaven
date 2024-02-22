import mongoose from "mongoose"
import Service from "./venderservices.model";
import User from "./user.model";
let ObjectId = mongoose.Schema.Types.ObjectId;
const collectionSchema = mongoose.Schema({
    name: {
      type: String,
    },
    user:{
      type: ObjectId,
      ref: User
    },
    items: [
      {
        id: {
          type: ObjectId,
          ref: Service
        }
      },
    ],
  },)
const Collection = mongoose.model('collection', collectionSchema);
export default Collection