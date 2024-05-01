const mongoose = require("mongoose")
// const {MongoMemoryServer} = require('mongodb-memory-server');
async  function connectMongoDB() {
    try {
        let MongoURI = process.env.MONGO_URI
        let dbName = 'bmaven_wbd'
        if(process.env.NODE_ENV === 'test'){
            dbName = 'test_wbd'
        }
        await mongoose.connect(MongoURI, {
            dbName
          })
    } catch (error) {
        console.log("Error connecting mongo db",error.message)
    }
}

module.exports = {connectMongoDB}