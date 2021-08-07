const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const upload = require("../middleware/multer");
const { protect, admin } = require("../middleware/authMiddleware.js");

// @description Get all products
// @route GET / api/products
// @acces Public
router.get("/", productsController.getAllProducts);

// @description Get single product
// @route GET / api/products/:id
// @acces Public
router.get("/:id", productsController.getProductById);

// @description Create product
// @route POST / api/products
// @acces Private/admin
router.post(
  "/",
  protect,
  admin,
  upload.array("productImages", 6),
  productsController.createProduct
);

// @description Update product
// @route PUT / api/products/:id
// @acces Private/admin
router.put("/:id", protect, admin, productsController.updateProduct);

// @description Delete product
// @route DELETE / api/products/:id
// @acces Private/admin
router.delete("/:id", protect, admin, productsController.deleteProduct);

module.exports = router;
