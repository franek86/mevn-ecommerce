const Brands = require("../models/Brands");

// @description Get all brands
// @route GET / api/brands
// @acces Public
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brands.find({});
    res.status(200).json({
      successMessage: "get all brands success",
      brands,
    });
  } catch (error) {
    console.log("get all brands error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Get single brand
// @route GET / api/brands/:id
// @acces Public
exports.getSingleBrand = async (req, res) => {
  let id = req.params.id;
  try {
    const brand = await Brands.findById(id);

    res.status(200).json({
      successMessage: "Get single brand success",
      brand,
    });
  } catch (error) {
    console.log("single brand error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Create brand
// @route POST / api/brands
// @acces Private/admin
exports.createBrands = async (req, res) => {
  const imagePath = req.file.path;
  const brand = req.body;
  brand.brandLogo = imagePath;

  try {
    const newBrand = new Brands(brand);

    const saveBrand = await newBrand.save();
    res.status(200).json({
      successMessage: `${saveBrand} added`,
      saveBrand,
    });
  } catch (error) {
    console.log("brands create error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Updated brand
// @route PUT / api/brands/:id
// @acces Private/admin
exports.updateBrand = async (req, res) => {
  const id = req.params.id;
  const newBrand = req.body;

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

  newBrand.brandLogo = newImage;
  try {
    const brand = await Brands.findByIdAndUpdate(id, newBrand, { new: true });

    const updateBrand = await brand.save();
    res.status(200).json({
      successMessage: `${updateBrand} added`,
      updateBrand,
    });
  } catch (error) {
    console.log("brands update error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description delete brand
// @route DELETE / api/brands/:id
// @acces Private/admin
exports.deleteBrand = async (req, res) => {
  const brand = await Brands.findById(req.params.id);
  try {
    if (brand) {
      await brand.remove();
    }

    res.status(200).json({
      successMessage: "Brand removed",
    });
  } catch (error) {
    console.log("brands delete error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
