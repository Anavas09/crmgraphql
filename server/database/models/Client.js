const mongoose = require("mongoose");

const { Schema } = mongoose;

const ClientSchema = new Schema({
  name: { type: String, required: true, trim: true },
  lastname: { type: String, required: false, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  company: { type: String, required: true, trim: true },
  phone: { type: String, required: false, trim: true },
  createAt: { type: Date, required: true, default: Date.now() },
  seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model("Client", ClientSchema);