const mongoose = require("mongoose")
const {MongoMemoryServer} = require('mongodb-memory-server');
async  function connectMongoDB() {
    try {
        let MongoURI = process.env.MONGO_URI
        if(process.env.NODE_ENV === 'test'){
            const mongoMemServer = await MongoMemoryServer.create();
            MongoURI = mongoMemServer.getUri();
        }
        await mongoose.connect(MongoURI, {
            dbName: 'bmaven_wbd', useNewUrlParser: true, useUnifiedTopology: true
          })
    } catch (error) {
        console.log("Error connecting mongo db",error.message)
    }
}

module.exports = {connectMongoDB}