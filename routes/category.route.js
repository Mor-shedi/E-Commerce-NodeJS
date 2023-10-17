const express = require("express");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const {
  categoryValidator,
  createCreateValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(createCreateValidator, createCategory);

router
  .route("/:id")
  .get(categoryValidator, getCategory)
  .patch(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
