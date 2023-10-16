const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @decs    Get All Categories
// @route   GET  /api/v1/categories
// @access  public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 | 1;
  const limit = req.query.limit * 1 | 4;
  const skip = (page - 1) * limit;
  const category = await Category.find().skip(skip).limit(limit);
  return res.status(200).json({ result: category.length, page, data: category });
});

// @decs    Get Single Category
// @route   GET   /api/v1/categories/:id
// @access  public
exports.getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({msg: 'No Category For This id'})
  }
  return res.status(200).json({ data: category });
});

// @decs    Update Category
// @route   PATCH   /api/v1/categories/:id
// @access  private
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({msg: 'No Category For This id'})
  }
  category.name = req.body.name;
  category.slug = slugify(req.body.name);
  await category.save();
  return res.status(200).json({ data: category });
});

// @decs    Delete Category
// @route   DELETE  /api/v1/categories/:id
// @access  private
exports.deleteCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({msg: 'No Category For This id'})
  }
  await category.deleteOne();
  return res.status(200).json({ msg: 'Deleted Successfully'});
});

// @decs    Create Category
// @route   POST  /api/v1/categories
// @access  private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  return res.status(201).json({ data: category });
});