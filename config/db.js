const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//connect to mongoDB cluster
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.massage);
    process.exit(1);
  }
};
module.exports = connectDB;
