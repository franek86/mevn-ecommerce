const mongoose = require("mongoose");

const HomeSliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    titleColor: {
      type: Boolean,
      default: false, //false = black, true = white
    },

    sliderImage: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("HomeSlider", HomeSliderSchema);
