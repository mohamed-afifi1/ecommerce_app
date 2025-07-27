const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

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

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory Id"),
  validatorMiddleware,
];
