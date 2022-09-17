const pool = require("./connection");

module.exports = {
  // returns a product's information
  readProduct: (product_id) => {
    return pool.connect().then((client) => {
      // const query = `SELECT name, slogan, description, category, default_price FROM products WHERE id = $1`;
      const query = ``;
      return client
        .query(query, [product_id])
        .then((res) => {
          client.release();
          return res.rows[0];
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    });
  },

  // returns a product's style information
  readStyle: (product_id) => {
    return pool.connect().then((client) => {
      const query = `SELECT name, sale_price, original_price, default_style FROM styles WHERE id = $1`;
      return client
        .query(query, [product_id])
        .then((res) => {
          client.release();
          return res.rows[0];
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    });
  },

  // returns a product's related product IDs
  readRelated: (product_id) => {
    return pool.connect().then((client) => {
      const query = `
        SELECT ARRAY_AGG(related_product_id) FROM related WHERE current_product_id = $1`;
      return client
        .query(query, [product_id])
        .then((res) => {
          client.release();
          return res.rows[0].array_agg;
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    });
  },
};
