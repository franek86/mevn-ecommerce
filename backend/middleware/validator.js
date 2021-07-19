const { check, validationResult } = require("express-validator");

exports.registerValidator = [
  check("username").not().isEmpty().trim().withMessage("All fields required"),
  check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 charaters long"),
];

exports.loginValidator = [
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email or password"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Invalid email or password"),
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firstError,
    });
  }
  next();
};
