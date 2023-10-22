const Brand = require("../models/brandModel");
const factory = require("./handlerFactory");

// @decs    Get All Brands
// @route   GET  /api/v1/brands
// @access  public
exports.getBrands = factory.getAll(Brand);

// @decs    Get Single brand
// @route   GET   /api/v1/brands/:id
// @access  public
exports.getBrand = factory.getOne(Brand);

// @decs    Update brand
// @route   PATCH   /api/v1/brands/:id
// @access  private
exports.updateBrand = factory.updateOne(Brand);

// @decs    Delete brand
// @route   DELETE  /api/v1/brands/:id
// @access  private
exports.deleteBrand = factory.deleteOne(Brand);

// @decs    Create Brand
// @route   POST  /api/v1/brands
// @access  private
exports.createBrand = factory.createOne(Brand);
