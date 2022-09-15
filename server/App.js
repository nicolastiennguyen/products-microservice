const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./connection');
const { postProducts, getProducts } = require('./controllers');

app.use(express.json());

app.get('/products', getProducts)
app.post('/products', postProducts)


app.listen(process.env.PORT, () => {
  console.log(`Listening at port: ${process.env.PORT}`)
});







// app.post("/products", async(req, res) => {
//   try {
//     console.log(req.body)
//     const { name, slogan, description, category} = req.body;
//     const newProduct = await pool.query("INSERT INTO products (name, slogan, description, category) VALUES ($1, $2, $3, $4) RETURNING *",
//     [name, slogan, description, category]
//     );
//     res.json(newProduct.rows[0])
//   } catch (err) {
//     console.error(err.message);
//   }
// })

// app.get("/products", async(req, res) => {
//   try {
//     console.log('hi')
//     const allProducts = await pool.query("SELECT * FROM products");
//     res.json(allProducts.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// })

