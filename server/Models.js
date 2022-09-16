const pool = require("./connection");

module.exports = {
  readProduct: (product_id) => {
    return pool.connect()
      .then(client => {
          const query = `SELECT name FROM products WHERE id = $1`;
          return client.query(query, [product_id])
            .then(res => {
              client.release()
              console.log(res.rows[0])
            })
            .catch(err => {
              client.release()
              console.log(err.stack)
            })
      })
  },

  readRelated: (product_id) => {
    return pool.connect()
      .then(client => {
        const query = `SELECT ARRAY_AGG (related.related_product_id) FROM related WHERE related.current_product_id = $1`
        return client.query(query, [product_id])
          .then(res => {
            client.release()
            console.log(res.rows[0].array_agg)
          })
          .catch(err => {
            client.release()
            console.log(err.stack)
          })
      })
  }
}
