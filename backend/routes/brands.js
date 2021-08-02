const express = require("express");
const router = express.Router();
const brandsController = require("../controllers/brands");
const upload = require("../middleware/multer");
const { protect, admin } = require("../middleware/authMiddleware.js");

// @description Get all brands
// @route GET / api/brands
// @acces Public
router.get("/", brandsController.getAllBrands);

// @description Get single brand
// @route GET / api/brands/:id
// @acces Public
router.get("/:id", brandsController.getSingleBrand);

// @description Create brands
// @route POST / api/brands
// @acces Private/admin
router.post(
  "/",
  protect,
  admin,
  upload.single("brandLogo"),
  brandsController.createBrands
);

// @description Update brand
// @route PUT / api/brands/:id
// @acces Private/admin
router.put(
  "/:id",
  protect,
  admin,
  upload.single("brandLogo"),
  brandsController.updateBrand
);

// @description Delete brand
// @route DELETE / api/brands/:id
// @acces Private/admin
router.delete("/:id", protect, admin, brandsController.deleteBrand);

module.exports = router;
