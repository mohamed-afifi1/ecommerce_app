const mongoose = require("mongoose");

const subcategoryschema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "subcategory should be unique"],
      minlength: [2, "too short name"],
      maxlength: [32, "too long name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subcategory must have category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subcategoryschema);
