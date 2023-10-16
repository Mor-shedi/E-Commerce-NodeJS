const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Duplicate Name"],
      minlength: [3, "Too Short Category Name"],
      maxlength: [30, "Too Long Category Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
