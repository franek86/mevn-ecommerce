const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    productBrand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brands",
    },
    title: {
      type: String,
      required: true,
    },
    sku: {
      type: Number,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },

    productImages: [{ type: Array }],

    size: [
      {
        type: String,
        required: true,
      },
    ],
    material: {
      type: String,
      required: true,
    },
    countryOrigin: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    inStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductsSchema);
