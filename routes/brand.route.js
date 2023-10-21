const express = require("express");

const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controller");

const {
  brandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrand);

router
  .route("/:id")
  .get(brandValidator, getBrand)
  .patch(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
