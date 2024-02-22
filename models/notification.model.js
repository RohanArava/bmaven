const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId;
const notificationSchema = mongoose.Schema({
            from_type: {
                type:String,
                required:true,
            },
            to_type: {
                type:String,
                required:true,
            },
            from:{
                type:ObjectId,
            },
            to:{
                type:ObjectId,
            },
            description:{
                type:String,
                required:true,
            },
            title:{
                type:String,
                required:true,
            },
})
const Notification = mongoose.model('notification', notificationSchema);
module.exports = {Notification}