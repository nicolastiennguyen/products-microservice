const pool = require("./connection");

module.exports = {
  // returns <COUNT> products on page <PAGE>
  // where COUNT is the number of products displayed
  // and PAGE is the page number
  readProducts: (page = 1, count = 5) => {
    return pool.connect().then((client) => {
      const query = `SELECT * FROM products WHERE ID BETWEEN $1 AND $2`
      return client
        .query(query, [page * count  - count + 1, page * count])
        .then((res) => {
          client.release();
          return res.rows;
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        })
    })
  },

  // returns a product's information
  readProduct: (product_id) => {
    return pool.connect().then((client) => {
      const query = `
      SELECT json_build_object('id', products.id, 'name', products.name, 'slogan', products.slogan, 'description', products.description, 'category', products.category, 'default_price', products.default_price, 'features',
        (SELECT ARRAY_AGG(f)
        FROM
          (SELECT json_build_object( 'feature', features.feature, 'value', features.value ) AS f
          FROM features
          WHERE features.product_id=$1 ) AS f) ) AS results
        FROM products
      WHERE products.id = $1 `;

      return client
        .query(query, [product_id])
        .then((res) => {
          client.release();
          return res.rows[0].results;
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
      const query = `
      SELECT id AS product_id,
      (SELECT json_agg( json_build_object( 'style_id', styles.id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default_style, 'photos',
        (SELECT array_agg(row_to_json(p))
        FROM
          (SELECT thumbnail_url,
         url
          FROM photos
          WHERE photos.styleId = styles.id ) p ), 'skus',
            (SELECT json_object_agg(sku.id,
         json_build_object( 'quantity', sku.quantity, 'size', sku.size ))
            FROM sku
            WHERE sku.styleId = styles.id ) ) ) AS results
            FROM styles
            WHERE productId = $1 )
          FROM products
        WHERE id = $1
      `;
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
