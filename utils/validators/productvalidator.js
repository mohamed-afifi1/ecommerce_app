const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const catModel = require("../../models/categoryModel");
const subcategoryModel = require("../../models/subCategory");
const brandModel = require("../../models/brandModel");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id"),
  validatorMiddleware,
];

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Product name too short"),

  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Description too long"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Sold quantity must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isLength({ max: 32 })
    .withMessage("Price is too long"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Price after discount must be a number")
    .toFloat()
    .custom((val, { req }) => {
      if (req.body.price <= val) {
        throw new Error(
          "Price after discount must be less than original price"
        );
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("Available colors must be an array"),

  check("imageCover").notEmpty().withMessage("Image cover is required"),

  check("images").optional().isArray().withMessage("Images must be an array"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID format")
    .custom(async (cat) => {
      const category = await catModel.findById(cat);
      if (!category) throw new Error(`No category found with ID: ${cat}`);
      return true;
    }),

  check("subcategories")
    .optional()
    .isArray()
    .withMessage("Subcategories must be an array of IDs"),

  check("subcategories.*")
    .optional()
    .isMongoId()
    .withMessage("Each subcategory must be a valid MongoDB ObjectId")
    .custom(async (subcatId) => {
      const subcat = await subcategoryModel.findById(subcatId);
      if (!subcat) throw new Error(`No subcategory found with ID: ${subcatId}`);
      return true;
    })
    .custom(async (subcatId, { req }) => {
      const match = await subcategoryModel.findOne({
        _id: subcatId,
        category: req.body.category,
      });
      if (!match) {
        throw new Error(
          `Subcategory ${subcatId} does not belong to category ${req.body.category}`
        );
      }
      return true;
    }),

  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid brand ID format")
    .custom(async (brand) => {
      const foundBrand = await brandModel.findById(brand);
      if (!foundBrand) throw new Error(`No brand found with ID: ${brand}`);
      return true;
    }),

  check("ratingsAverage")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Rating quantity must be a number"),

  validatorMiddleware,
];


exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id"),
  validatorMiddleware,
];
