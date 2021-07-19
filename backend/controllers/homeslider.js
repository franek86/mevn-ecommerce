const HomeSlider = require("../models/HomeSlider");

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
  const [{ path }] = req.files.sliderImage;

  const { title, titleColor } = req.body;

  try {
    let slider = new HomeSlider();
    slider.sliderImage = path;

    slider.title = title;
    slider.titleColor = titleColor;

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
  const { title, titleColor } = req.body;
  const [{ path }] = req.files.sliderImage;
  try {
    const slider = await HomeSlider.findByIdAndUpdate(req.params.id);
    if (slider) {
      slider.sliderImage = path;
      slider.title = title;
      slider.titleColor = titleColor;
    }
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
