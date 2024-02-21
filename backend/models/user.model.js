import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    collections: [
        {
          name: {
            type: String,
          },
          items: [
            {
              id: {
                type: Number,

              },
              name: {
                type: String,
              },
              image: {
                type: String,
              },
            },
          ],
        },
    ],

    history:[
        {
            name:{
                type:String,
            },
            serviceName:{
                type:String,
            },
            servicePrice:{
                type:Number,
            },
            serviceTime:{
                type: Date,
            },
            paymentMethod:{
                type:String,
            },
            paymentId:{
                type:String,
            },
            description:{
                type:String,
            }

        },
    ],
    


});

const User = mongoose.model("user", UserSchema)

export default User