const express = require("express");
const {
  newCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validators/categoryvalidator");
const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:catid/subcategory", subCategoryRoute);

router
  .post("/", createCategoryValidator, newCategory)
  .get("/", getCategories)
  .get("/:id", getCategoryValidator, getCategory)
  .post("/:id", updateCategoryValidator, updateCategory)
  .delete("/:id", getCategoryValidator, deleteCategory);

module.exports = router;
