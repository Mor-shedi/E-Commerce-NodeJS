const express = require("express");

const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  ProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, createProduct);

router
  .route("/:id")
  .get(ProductValidator, getProduct)
  .patch(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
