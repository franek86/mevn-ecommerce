const mongoose = require("mongoose");

const BrandsSchema = new mongoose.Schema(
  {
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
