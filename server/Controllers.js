const { readProducts, readProduct, readStyle, readRelated } = require("./models");

module.exports = {

  getProducts: (req, res) => {
    const { page, count } = req.query;
    readProducts(page, count)
      .then(results => {
        res.json(results)
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      })
  },

  getProduct: (req, res) => {
    const { product_id } = req.params;
    readProduct(product_id)
      .then((results) => {
        res.json(results);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  },

  getStyle: (req, res) => {
    const { product_id } = req.params;
    readStyle(product_id)
      .then(results => {
        res.json(results);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      })
  },

  getRelated: (req, res) => {
    const { product_id } = req.params;
    readRelated(product_id)
      .then((results) => {
        res.json(results);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  },
};
