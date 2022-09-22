const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const cors = require('cors');
const router = require('./routes');
const { getProducts } = require('./controllers');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.use('/products', router);
app.get(process.env.LOADERIO_TOKEN, (req, res) => res.send(process.env.LOADERIO_TOKEN));


app.listen(process.env.PORT, () => {
  console.log(`Listening at port: ${process.env.PORT}`)
});

