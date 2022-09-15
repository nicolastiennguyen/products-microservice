const { writeProducts, readProducts } = require('./models')


module.exports = {
  getProducts: (req, res) => {
    console.log(req.body)
  },

  postProducts: (req, res) => {
    console.log(req.body)
  }
}