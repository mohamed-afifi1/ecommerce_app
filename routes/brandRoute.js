const express = require("express");
const {
  newBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
} = require("../utils/validators/brandValidator");

const router = express.Router();

router
  .post("/", createBrandValidator, newBrand)
  .get("/", getBrands)
  .get("/:id", getBrandValidator, getBrand)
  .post("/:id", updateBrandValidator, updateBrand)
  .delete("/:id", getBrandValidator, deleteBrand);

module.exports = router;
