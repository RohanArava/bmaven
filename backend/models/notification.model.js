import mongoose from "mongoose"

const notificationSchema = mongoose.Schema({
    notification:[
        {
            isvendor:{
                type:Boolean,
                required:true,
            },
            description:{
                type:String,
                required:true,
            },
            title:{
                type:String,
                required:true,
            },
        },
    ],
})
const Notification = mongoose.model('notification', notificationSchema);
export default Notification