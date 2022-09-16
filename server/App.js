const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const router = require('./routes');
const { getProducts } = require('./controllers');

app.use(morgan('dev'));
app.use(express.json());


app.use('/products', router);


app.listen(process.env.PORT, () => {
  console.log(`Listening at port: ${process.env.PORT}`)
});

