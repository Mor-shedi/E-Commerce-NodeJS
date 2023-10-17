const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.categoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];

exports.createCreateValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 30 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];
