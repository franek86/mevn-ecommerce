const HomeSlider = require("../models/HomeSlider");
const fs = require("fs");

// @description Get home sliders
// @route GET / api/brands
// @acces Public
exports.getHomeSlider = async (req, res) => {
  try {
    const slider = await HomeSlider.find({});
    res.status(200).json({
      successMessage: "get home slider success",
      slider,
    });
  } catch (error) {
    console.log("get home slider error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.getSingleHomeSlider = async (req, res) => {
  let id = req.params.id;
  try {
    const slider = await HomeSlider.findById(id);
    res.status(200).json({
      successMessage: "get home slider success",
      slider,
    });
  } catch (error) {
    console.log("get home slider error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Create product
// @route POST / api/slider
// @acces Private/admin
exports.createSlider = async (req, res) => {
  const slide = req.body;
  const imagePath = req.file.path;
  slide.sliderImage = imagePath;

  try {
    let slider = new HomeSlider(slide);
    // slider.sliderImage = path;
    // slider.title = title;
    // slider.titleColor = titleColor;

    await slider.save();
    res.status(200).json({
      successMessage: `${slider} added`,
      slider,
    });
  } catch (error) {
    console.log("slider create error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Updated slider
// @route PUT / api/slider/:id
// @acces Private/admin
exports.updateSlider = async (req, res) => {
  const id = req.params.id;
  const newSlide = req.body;
  let newImage = "";
  if (req.file) {
    newImage = req.file.path;
    try {
      fs.unlinkSync("./uploads" + req.body.oldImage);
    } catch (error) {
      console.log(error);
    }
  } else {
    newImage = req.body.oldImage;
  }

  newSlide.sliderImage = newImage;

  try {
    const slider = await HomeSlider.findByIdAndUpdate(id, newSlide, {
      new: true,
    });

    const updateSlider = await slider.save();
    res.status(200).json({
      successMessage: `${updateSlider} updated`,
      updateSlider,
    });
  } catch (error) {
    console.log("slider update error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description delete slider
// @route DELETE / api/slider/:id
// @acces Private/admin

exports.deleteSlider = async (req, res) => {
  const slider = await HomeSlider.findById(req.params.id);
  try {
    if (slider) {
      await slider.remove();
    }
    res.status(200).json({
      successMessage: "Slider removed",
    });
  } catch (error) {
    console.log("slider delete error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
