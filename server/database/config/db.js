const mongoose = require("mongoose");

require("dotenv").config({
  path: "variables.env",
});

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(db => {
        db.connection.db.listCollections().toArray((err, names) => {
          console.log(names);
        });
        console.info("DB is connected");
      })
      .catch(err => console.error(err));
  } catch (err) {
    console.error("AN ERROR");
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;