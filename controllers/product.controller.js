const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const ApiError = require('../utils/apiError');

// @decs    Get All Product
// @route   GET  /api/v1/products
// @access  public
exports.getProducts = asyncHandler(async (req, res) => {
  // Filtering
  const queryStringObj = { ...req.query };
  const excludesFields = ['page', 'sort', 'limit', 'fields'];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  let queryStr = JSON.stringify(queryStringObj) // convert queryStringObj to string
  queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  // Build Query
  let mongooseQuery = Product.find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name-_id' });

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    console.log(sortBy);
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort('-createdAt');
  }
  
  // Execute Query
  const product = await mongooseQuery;

  return res.status(200).json({ result: product.length, page, data: product });
});

// @decs    Get Single Product
// @route   GET   /api/v1/products/:id
// @access  public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'category',
    select: 'name-_id',
  });
  if (!product) {
    return next(new ApiError('No Product For This id', 404));
  }
  return res.status(200).json({ data: product });
});

// @decs    Update Product
// @route   PATCH   /api/v1/products/:id
// @access  private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError('No Product For this id'));
  }
  return res.status(200).json({ data: product });
});

// @decs    Delete Product
// @route   DELETE  /api/v1/products/:id
// @access  private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError('No Product For This id', 404));
  }
  await product.deleteOne();
  return res.status(200).json({ msg: 'Deleted Successfully' });
});

// @decs    Create Product
// @route   POST  /api/v1/products
// @access  private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  return res.status(201).json({ data: product });
});
