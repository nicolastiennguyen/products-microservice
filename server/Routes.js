const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/product.controller')

// router --> controller --> model
router.get('/products', getProducts)

module.exports = router