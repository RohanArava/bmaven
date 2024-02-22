const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId;
const collectionSchema = mongoose.Schema({
    name: {
      type: String,
    },
    user:{
      type: ObjectId,
      ref: 'user'
    },
    items: [
      {
        id: {
          type: ObjectId,
          ref: 'service'
        }
      },
    ],
  },)
const Collection = mongoose.model('collection', collectionSchema);
module.exports = { Collection }