const express = require("express");
const router = express.Router();
const homesliderController = require("../controllers/homeslider");
const upload = require("../middleware/multer");
const { protect, admin } = require("../middleware/authMiddleware.js");

// @description Get home slider
// @route GET / api/slider
// @acces Public
router.get("/", homesliderController.getHomeSlider);

router.get("/:id", homesliderController.getSingleHomeSlider);

// @description Create home slider
// @route POST / api/slider
// @acces Private/admin
router.post(
  "/",
  protect,
  admin,

  upload.fields([{ name: "sliderImage", maxCount: 1 }]),
  homesliderController.createSlider
);

// @description Update home slider
// @route PUT / api/slider/:id
// @acces Private/admin
router.put(
  "/:id",
  protect,
  admin,
  upload.fields([{ name: "sliderImage", maxCount: 1 }]),
  homesliderController.updateSlider
);

// @description Delete home slider
// @route DELETE / api/slider/:id
// @acces Private/admin
router.delete("/:id", protect, admin, homesliderController.deleteSlider);

module.exports = router;
