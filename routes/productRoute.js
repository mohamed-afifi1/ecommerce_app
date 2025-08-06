const express = require("express");
const {
  newProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
} = require("../utils/validators/productvalidator");

const router = express.Router();

router
  .post("/", createProductValidator, newProduct)
  .get("/", getProducts)
  .get("/:id", getProductValidator, getProduct)
  .post("/:id", updateProductValidator, updateProduct)
  .delete("/:id", getProductValidator, deleteProduct);

module.exports = router;
