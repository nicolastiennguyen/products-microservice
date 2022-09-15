const {readProducts} = require('../models/product.model')

module.exports = {
  getProducts: (req, res) => {
    readProducts()
  },
}