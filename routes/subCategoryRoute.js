const express = require("express");
const {
  newSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  fromParamsToBody,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validators/subcategoryvalidator");

const router = express.Router({ mergeParams: true });

router
  .post("/", fromParamsToBody, createSubCategoryValidator, newSubCategory)
  .get("/", getSubCategories)
  .get("/:id", getSubCategoryValidator, getSubCategory)
  .post("/:id", updateSubCategoryValidator, updateSubCategory)
  .delete("/:id", getSubCategoryValidator, deleteSubCategory);

module.exports = router;
