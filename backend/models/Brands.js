const mongoose = require("mongoose");

const BrandsSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    brandLogo: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Brands", BrandsSchema);
