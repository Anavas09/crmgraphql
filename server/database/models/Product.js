const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true},
  createAt: { type: Date, required: true, default: Date.now() },
});

ProductSchema.index({ name: 'text' });

module.exports = mongoose.model("Product", ProductSchema);