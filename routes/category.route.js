const express = require("express");
const {
  getCategories,
  createCategory,
  getCategory, 
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

const router = express.Router();

router.route("/").post(createCategory).get(getCategories);
router.route("/:id").get(getCategory).patch(updateCategory).delete(deleteCategory);

module.exports = router;
