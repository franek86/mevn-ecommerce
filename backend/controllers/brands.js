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
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brands.findById(req.params.id);
    const { ...others } = brand._doc;
    res.status(200).json({
      successMessage: "Get single brand success",
      others,
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
  const { filename } = req.file;
  const newBrand = new Brands(req.body);
  try {
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
  const { title, subtitle, description, logo, category } = req.body;
  try {
    const brand = await Brands.findOneAndUpdate(req.params.id);

    if (brand) {
      brand.title = title;
      brand.subtitle = subtitle;
      brand.description = description;
      brand.category = category;
      brand.logo = logo;
    }
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
