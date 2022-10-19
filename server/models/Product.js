const mongoose = require("mongoose");

const ProductSchema = {
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  firstprice: { type: Number, required: true },
  quantity: { type: Number, required: false },
};

module.exports = mongoose.model("Product", ProductSchema);
