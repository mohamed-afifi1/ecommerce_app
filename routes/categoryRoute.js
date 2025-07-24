const express = require('express')
const { newcategory, getcategories, getcategory, updatecategory, deletecategory } = require('../services/categoryService')

const validatorMiddleware = require('../middleware/validatorMiddleware');
const { getcategoryvaildator, createcategoryvalidator } = require('../utils/validators/categoryvalidator');

const router = express.Router();

router.post('/',createcategoryvalidator, newcategory )
.get('/', getcategories)
.get('/:id',getcategoryvaildator, getcategory)
.post('/:id',getcategoryvaildator, updatecategory).
delete('/:id',getcategoryvaildator, deletecategory);

module.exports = router;