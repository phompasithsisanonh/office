const mongoose = require("mongoose");
const options = {
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
};

const connectDB = (url) => {
  try {
    return mongoose
      .connect(process.env.MONGODB_URL, options)
      .then(() => console.log("DB is connected"))
      .catch((err) => console.error(err));
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
