import http from 'k6/http';
import { check, sleep } from 'k6';
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';

// simulates an increasing demand of users making requests on the server, a plateau, and finally a decreasing demand back to 0 users.
// 0s - 30s: 0 --> 1000 users (at most)
// 30s - 60s: 1000 users
// 60-90s: 1000 --> 0 users

// sleep: per VU, iterations (i.e. requests) per second

export let options = {
  thresholds: {
    http_req_duration: ['avg<50'],
    http_req_failed: ['rate<0.01'],
  },
  stages: [
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 0 },
  ]
};

const getRandomInt = (min , max) => Math.floor(Math.random() * (max - min) + min);

// GET /products
// export default function() {
//   const url = 'http://localhost:4000/products';
//   let page = getRandomInt(1, 100);
//   let count = getRandomInt(1, 100);
//   const searchParams = new URLSearchParams([
//     ['page', `${page}`],
//     ['count', `${count}`]
//   ])
//   const res = http.get(`${url}?${searchParams.toString()}`);
//   check(res, { 'status was 200': r => r.status == 200});
//   sleep(1);
// }

// GET /products/:product_id
// export default function() {
//   let id = getRandomInt(1, 1000000);
//   let res = http.get(`http://localhost:4000/products/${id}`);
//   check(res, { 'status was 200': r => r.status == 200});
//   sleep(1);
// }

// GET /products/:product_id/styles
// export default function() {
//   let id = getRandomInt(1, 1000000);
//   let res = http.get(`http://localhost:4000/products/${id}/styles`);
//   check(res, { 'status was 200': r => r.status == 200});
//   sleep(1);
// }

// GET /products/:product_id/related
// export default function() {
//   let id = getRandomInt(1, 1000000);
//   let res = http.get(`http://localhost:4000/products/${id}/related`);
//   check(res, { 'status was 200': r => r.status == 200});
//   sleep(1);
// }