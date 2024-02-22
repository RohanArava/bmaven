const mongoose = require("mongoose")
async  function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'bmaven_wbd',
          })
    } catch (error) {
        console.log("Error connecting mongo db",error.message)
    }
}

module.exports = {connectMongoDB}