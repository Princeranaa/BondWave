const mongoose = require("mongoose");

require("dotenv").config();
exports.connectToDatabase = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error, "somthing went wrong to connect");
  }
};
