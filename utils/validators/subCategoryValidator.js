const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.subcategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id can not be empty")
    .isMongoId()
    .withMessage("Invalid SubCategory ID Format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Required")
    .isLength({ min: 3 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 30 })
    .withMessage("Too long Subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("subcategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id Can not be empty")
    .isMongoId()
    .withMessage("Invalid subCategory ID Format"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id Can not be empty")
    .isMongoId()
    .withMessage("Invalid SubCategory ID Format"),
  validatorMiddleware,
];
