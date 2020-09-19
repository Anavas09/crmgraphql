const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  order: { type: Array, required: true },
  total: { type: Number, required: false },
  client: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Client' },
  seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  status: { type: String, required: true, trim: true, default: 'PENDING' },
  createAt: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model("Order", OrderSchema);