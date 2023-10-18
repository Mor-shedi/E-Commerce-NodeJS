const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategoryModel");

// @decs    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  return res.status(201).json({ data: subCategory });
});

// nested route
// GET /api/v1/categories/:categoryId/subcategories

// @decs    Get All SubCategories
// @route   GET  /api/v1/subcategories
// @access  public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const subCategory = await SubCategory.find(filterObject, { __v: 0 })
    .skip(skip)
    .limit(limit);
  // .populate({ path: "category", select: "name -_id" });
  return res
    .status(200)
    .json({ result: subCategory.length, page, data: subCategory });
});

// @decs    Get Single SubCategory by id
// @route   GET   /api/v1/subcategories/:id
// @access  public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory) {
    return next(new ApiError("No SubCategory For This id", 404));
  }
  return res.status(200).json({ data: subCategory });
});

// @decs    Update SubCategory
// @route   PATCH   /api/v1/subcategories/:id
// @access  private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory) {
    return next(new ApiError("No Category For This id", 404));
  }
  subCategory.name = req.body.name;
  subCategory.slug = slugify(req.body.name);
  subCategory.category = req.body.category;
  await subCategory.save();
  return res.status(200).json({ data: subCategory });
});

// @decs    Delete SubCategory
// @route   DELETE  /api/v1/categories/:id
// @access  private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory) {
    return next(new ApiError("No Category For This id", 404));
  }
  await subCategory.deleteOne();
  return res.status(200).json({ msg: "Deleted Successfully" });
});
