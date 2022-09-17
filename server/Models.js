const pool = require("./connection");

module.exports = {
  // returns a product's information
  readProduct: (product_id) => {
    return pool.connect().then((client) => {
      const query = `
      SELECT
      json_build_object(
        'name', products.name,
        'slogan', products.slogan,
        'description', products.description,
        'category', products.category,
        'default_price', products.default_price,
        'features', (
          SELECT
          ARRAY_AGG(f)
          FROM (
            SELECT
            json_build_object(
              'feature', features.feature,
              'value', features.value
            )
            AS f
            FROM features
            WHERE features.product_id=$1
          )
        as f)
        )
        as prod
        FROM products
        WHERE products.id = $1`;

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
