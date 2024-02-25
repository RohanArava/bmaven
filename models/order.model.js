const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId;
const OrderSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "user",
    },
    date: Date, accepted: Boolean,


    item: {
        type: ObjectId,
        ref: "service"
    },
    count: {
        type: Number,
    },
    vendor: {
        type: ObjectId,
        ref: "vendor"
    }
});

const Order = mongoose.model("order", OrderSchema)

module.exports = { Order }