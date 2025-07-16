const express = require('express')
const { newcategory } = require('../services/categoryService')

const router = express.Router();

router.post('/', newcategory )

module.exports = router;