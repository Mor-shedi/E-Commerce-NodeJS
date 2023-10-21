const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.brandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID Format"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand Required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 30 })
    .withMessage("Too long Brand name"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID Format"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID Format"),
  validatorMiddleware,
];
