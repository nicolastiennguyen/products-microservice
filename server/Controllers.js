const { readProducts } = require('./models')
const pool = require("./connection");

pool.connect();

module.exports = {
  // getProducts: (req, res) => {
  //   console.log(req.body)
  // },
  getProducts: (req, res) => {
    console.log('got to controllers')
    pool.query('SELECT name FROM products')
      .then(result => console.log(result))
    // pool.connect()
    // .then(client => {
    //   return client
    //   .query("SELECT name FROM products WHERE ID=1")
    //   .then(res => {
    //     client.release()
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     client.release()
    //     console.log(err.stack)
    //   })
    // })

  },

  postProducts: (req, res) => {
    console.log(req.body)
  }
}