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
  firstprice: {
    type: Number,
    required: true,
  },
  startTender: {
    type: Date,
    default: true,
  },
  endTender: {
    type: Date,
    required: true,
  },
  owner: {
    type: String,
    required: false,
  },
  isSdmin: {
    type: String,
    Boolean: false,
  },
};

module.exports = mongoose.model("Product", ProductSchema);
