const express = require('express');
const router = express.Router();
const { getProduct } = require('./controllers');

// routes to /products/?:product_id

// router.get('/', getProduct);
router.get('/:product_id', getProduct);

module.exports = router;