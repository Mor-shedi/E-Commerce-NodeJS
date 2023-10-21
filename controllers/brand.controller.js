const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");

// @decs    Get All Brands
// @route   GET  /api/v1/brands
// @access  public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const brand = await Brand.find({}, { __v: 0 }).skip(skip).limit(limit);
  return res.status(200).json({ result: brand.length, page, data: brand });
});

// @decs    Get Single brand
// @route   GET   /api/v1/brands/:id
// @access  public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return next(new ApiError("No Brand For This id", 404));
  }
  return res.status(200).json({ data: brand });
});

// @decs    Update brand
// @route   PATCH   /api/v1/brands/:id
// @access  private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return next(new ApiError("No Brand For This id", 404));
  }
  brand.name = req.body.name;
  brand.slug = slugify(req.body.name);
  await brand.save();
  return res.status(200).json({ data: brand });
});

// @decs    Delete brand
// @route   DELETE  /api/v1/brands/:id
// @access  private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return next(new ApiError("No Brand For This id", 404));
  }
  await brand.deleteOne();
  return res.status(200).json({ msg: "Deleted Successfully" });
});

// @decs    Create Brand
// @route   POST  /api/v1/brands
// @access  private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  return res.status(201).json({ data: brand });
});
