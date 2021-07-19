const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const { protect, admin } = require("../middleware/authMiddleware.js");

// @description Get all categories
// @route GET / api/category
// @acces Public
router.get("/", categoryController.getAllCategories);

// @description Create category
// @route POST / api/category
// @acces Private/admin
router.post("/", protect, admin, categoryController.createCategory);

// @description Update category
// @route POST / api/category
// @acces Private/admin
router.put("/:id", protect, admin, categoryController.updateCategory);

// @description Delete category
// @route DELETE / api/category
// @acces Private/admin
router.delete("/:id", protect, admin, categoryController.deleteCategory);

module.exports = router;
