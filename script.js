import http from 'k6/http';
import { check, sleep } from 'k6';

// simulates an increasing demand of users making requests on the server, a plateau, and finally a decreasing demand back to 0 users.
// 0s - 15s: 0 --> 100 users
// 15s - 45s: at most* 100 users
// 45-60s: 100 --> 0 users

export let options = {
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '15s', target: 0 },
  ]
};


export default function() {
  let res = http.get('http://localhost:3000/');
  check(res, { 'status was 200': r => r.status == 200});
  sleep(1);
}