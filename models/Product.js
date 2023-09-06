const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image_ids: {
    type: [String],
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [String],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
