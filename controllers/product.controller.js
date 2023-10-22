const Product = require("../models/productModel");
const factory = require("./handlerFactory");

// @decs    Get All Product
// @route   GET  /api/v1/products
// @access  public
exports.getProducts = factory.getAll(Product, "Product");

// @decs    Get Single Product
// @route   GET   /api/v1/products/:id
// @access  public
exports.getProduct = factory.getOne(Product);

// @decs    Update Product
// @route   PATCH   /api/v1/products/:id
// @access  private
exports.updateProduct = factory.updateOne(Product);

// @decs    Delete Product
// @route   DELETE  /api/v1/products/:id
// @access  private
exports.deleteProduct = factory.deleteOne(Product);

// @decs    Create Product
// @route   POST  /api/v1/products
// @access  private
exports.createProduct = factory.createOne(Product);
