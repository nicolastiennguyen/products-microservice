const { readProduct, readStyle, readRelated } = require('./models')

module.exports = {
  getProduct: (req, res) => {
    const { product_id } = req.params;
    readProduct(product_id)
      .then(results => {res.json(results)})
      .catch(error => {
        console.error(err)
        res.sendStatus(500)
      })
  },

  getStyle: (req, res) => {
    const { product_id } = req.params;
    readStyle(product_id)
  },

  getRelated: (req, res) => {
    const { product_id } = req.params;
    readRelated(product_id)
      .then(results => {res.json(results)})
      .catch(error => {
        console.error(err)
        res.sendStatus(500)
      })
  },

}