const mongoose = require("mongoose");

require("dotenv").config({
  path: "variables.env",
});

const mongoDB_URI = process.env.PORT !== 4000 ? process.env.DB_MONGO_URI: process.env.LOCAL_DB_MONGO_URI

const connectDB = async () => {
  try {
    await mongoose
      .connect(mongoDB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        console.info("DB is connected");
      })
      .catch(err => console.error(err));
  } catch (err) {
    console.error("SOMETHING WRONG WAS HAPPEND: ERROR");
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;