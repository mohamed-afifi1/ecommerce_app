const express = require("express");
const {
  newcategory,
  getcategories,
  getcategory,
  updatecategory,
  deletecategory,
  getAllSubCategories,
} = require("../services/categoryService");

const {
  getCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryvalidator");

const router = express.Router();

router
  .post("/", createCategoryValidator, newcategory)
  .get("/", getcategories)
  .get("/:id", getCategoryValidator, getcategory)
  .get("/:id/subcategory", getCategoryValidator, getAllSubCategories)
  .post("/:id", getCategoryValidator, updatecategory)
  .delete("/:id", getCategoryValidator, deletecategory);

module.exports = router;
