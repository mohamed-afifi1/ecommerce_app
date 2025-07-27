const express = require("express");
const {
  newSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validators/subcategoryvalidator");

const router = express.Router();

router
  .post("/", createSubCategoryValidator, newSubCategory)
  .get("/", getSubCategories)
  .get("/:id", getSubCategoryValidator, getSubCategory)
  .post("/:id", getSubCategoryValidator, updateSubCategory)
  .delete("/:id", getSubCategoryValidator, deleteSubCategory);

module.exports = router;
