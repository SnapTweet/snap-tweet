const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

let mongoServer

const connectTestDB = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create()
  }

  const mongoUri = mongoServer.getUri()

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
}

const closeTestDB = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  }
}

module.exports = { connectTestDB, closeTestDB }
