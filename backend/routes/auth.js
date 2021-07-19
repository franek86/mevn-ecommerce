const router = require("express").Router();

const {
  registerValidator,
  loginValidator,
  validatorResult,
} = require("../middleware/validator");

const { registerController, loginController } = require("../controllers/auth");

// @description Register new user
// @route POST / api/auth/register
// @acces Public
router.post(
  "/register",
  registerValidator,
  validatorResult,
  registerController
);

// @description Authenticate user & get token
// @route POST / api/auth/login
// @acces Public
router.post("/login", loginValidator, validatorResult, loginController);

module.exports = router;
