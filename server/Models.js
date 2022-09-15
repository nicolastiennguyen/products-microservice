const axios = require("axios");
const pool = require("../databases/product.db/connection");

module.exports = {
  readProducts: () => {
    console.log('got here')
    return pool.query("SELECT * FROM products");
  }
}