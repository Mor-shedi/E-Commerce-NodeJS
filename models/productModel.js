const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Duplicate Title"],
      minlength: [3, "Too Short Title"],
      maxlength: [100, "Too Long Title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product description is required"],
      minlength: [20, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      trim: true,
      max: [200000, "too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    images: [String],
    imageCover: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must be belong to a category"],
    },
    subcategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
