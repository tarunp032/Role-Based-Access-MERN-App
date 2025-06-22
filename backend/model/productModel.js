const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  price: { type: Number },
  user_id: { type: mongoose.Schema.ObjectId, require: true, ref: "user" },
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;