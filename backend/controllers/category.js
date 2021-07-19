const Category = require("../models/Category");

// @description Get all categories
// @route GET / api/category
// @acces Public
exports.getAllCategories = async (req, res) => {
  try {
    const cat = await Category.find({});
    res.status(200).json({
      successMessage: "get all categories success",
      cat,
    });
  } catch (error) {
    console.log("get all categories error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Create category
// @route POST / api/category
// @acces Private/admin
exports.createCategory = async (req, res) => {
  const { category } = req.body;

  try {
    let newCategory = new Category();
    newCategory.category = category;
    newCategory = await newCategory.save();

    res.status(200).json({
      successMessage: `${newCategory} added`,
      newCategory,
    });
  } catch (error) {
    console.log("category create error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Updated category
// @route PUT / api/category/:id
// @acces Private/admin
exports.updateCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const cat = await Category.findOneAndUpdate(req.params.id);

    if (cat) {
      cat.category = category;
    }
    const updateCategory = await cat.save();
    res.status(200).json({
      successMessage: `${updateCategory} added`,
      updateCategory,
    });
  } catch (error) {
    console.log("category update error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Delete category
// @route DELETE / api/category
// @acces Private/admin
exports.deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  try {
    if (category) {
      await category.remove();
    }

    res.status(200).json({
      successMessage: "Category removed",
    });
  } catch (error) {
    console.log("brands delete error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
