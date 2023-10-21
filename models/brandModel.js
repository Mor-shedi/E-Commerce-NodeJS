const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Duplicate Name"],
      minlength: [3, "Too Short Brand Name"],
      maxlength: [30, "Too Long Brand Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Brand", BrandSchema);
