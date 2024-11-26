const mongoose = require("mongoose");
const options = {
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
};

const connectDB = async (url) => {
  try {
    await mongoose.connect(url,options,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB is connected");
  } catch (err) {
    console.error("Error connecting to DB:", err);
    process.exit(1); // Exit the process if the database connection fails
  }
};

module.exports = connectDB;
