const pool = require("./connection");

// pool.connect();

module.exports = {
  readProduct: (product_id) => {
    pool.connect()
      .then(client => {
          const query = `SELECT name FROM products WHERE products.id = $1`
          client.query(query, [product_id])
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
}




// module.exports = {
//   getProducts: (req, res) => {
//     console.log('got to controllers')
//     pool.query('SELECT name FROM products')
//       .then(result => console.log(result))

//   },

//   postProducts: (req, res) => {
//     console.log(req.body)
//   }
// }