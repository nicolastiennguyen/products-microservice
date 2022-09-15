const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');

const stream = fs.createReadStream('./.csv/product.csv')
const csvData = [];
const csvStream = fastcsv
  .parse()
  .on('data', (data) => {
    csvData.push(data);
  })
  .on('end', () => {
    csvData.shift();
    const pool = new Pool({
      host: 'localhost',
      user: 'nicolasnguyen',
      password: '',
      port: 5432,
      database: 'products',
      idleTimeoutMillis: 0,
      connectionTimeoutMillis: 0
    })
    const query = "INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)"
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {console.log(err)}
          })
        })
      } finally {
        console.log('finished')
        done();
      }
    })
  })

stream.pipe(csvStream);

// fs.createReadStream('./.csv/product.csv')
//   .pipe(csv())
//   .on('data', (data) => res.push(data))
//   .on('end', () => {
//     console.log(res.slice(0, 5));
//   })
