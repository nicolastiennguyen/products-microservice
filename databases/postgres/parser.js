const csv = require('csv-parser');
const fs = require('fs');
const res = [];

fs.createReadStream('./.csv/product.csv')
  .pipe(csv())
  .on('data', (data) => res.push(data))
  .on('end', () => {
    console.log(results.slice(0, 5));
  })
