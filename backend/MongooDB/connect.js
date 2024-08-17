const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const options = {
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
};

const connectDB = async (url) => {
  try {
    const client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await  await client.connect() ;
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to DB:", err);
    process.exit(1); // Exit the process if the database connection fails
  }
};

module.exports = connectDB;
