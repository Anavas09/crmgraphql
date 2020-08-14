const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  lastname: { type: String, required: false, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  createAt: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model("User", UserSchema);