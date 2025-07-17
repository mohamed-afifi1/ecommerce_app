const express = require('express')
const { newcategory, getcategories, getcategory, updatecategory, deletecategory } = require('../services/categoryService')

const router = express.Router();

router.post('/', newcategory ).get('/', getcategories).get('/:id', getcategory)
.post('/:id', updatecategory).delete('/:id', deletecategory);

module.exports = router;