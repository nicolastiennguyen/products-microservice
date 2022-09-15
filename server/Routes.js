const router = require('express').Router();
const { getProducts } = require('./controllers');

// router --> controller --> model
router.get('/products', getProducts);

module.exports = router;