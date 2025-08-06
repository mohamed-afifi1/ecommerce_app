const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const catModel = require("../../models/categoryModel");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory Id"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subcategory required")
    .isLength({ min: 2 })
    .withMessage("subcategory name too short")
    .isLength({ max: 32 })
    .withMessage("subcategory name too long"),
  check("category")
    .notEmpty()
    .withMessage("must have category Id")
    .isMongoId()
    .withMessage("invalid Category Id"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory Id"),
  check("name")
    .isLength({ min: 2 })
    .withMessage("subcategory name too short")
    .isLength({ max: 32 })
    .withMessage("subcategory name too long"),
  check("category")
    .isMongoId()
    .withMessage("invalid Category Id")
    .custom(async (cat) => {
      const category = await catModel.findById(cat);
      if (!category) throw new Error(`No category found with ID: ${cat}`);
      return true;
    }),
  validatorMiddleware,
];
