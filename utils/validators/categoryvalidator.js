const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');


exports.getcategoryvaildator = [
    check('id').isMongoId().withMessage('Invalid category Id'),
    validatorMiddleware,
]

exports.createcategoryvalidator = [
    check('name').notEmpty().withMessage('category required')
    .isLength({min: 3}).withMessage('category name too short')
    .isLength({max: 32}).withMessage('category name too long'),
    validatorMiddleware,
]

