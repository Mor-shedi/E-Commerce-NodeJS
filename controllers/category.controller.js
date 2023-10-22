const Category = require("../models/categoryModel");
const factory = require("./handlerFactory");

// @decs    Get All Categories
// @route   GET  /api/v1/categories
// @access  public
exports.getCategories = factory.getAll(Category);

// @decs    Get Single Category
// @route   GET   /api/v1/categories/:id
// @access  public
exports.getCategory = factory.getOne(Category);

// @decs    Update Category
// @route   PATCH   /api/v1/categories/:id
// @access  private
exports.updateCategory = factory.updateOne(Category);

// @decs    Delete Category
// @route   DELETE  /api/v1/categories/:id
// @access  private
exports.deleteCategory = factory.deleteOne(Category);

// @decs    Create Category
// @route   POST  /api/v1/categories
// @access  private
exports.createCategory = factory.createOne(Category);
