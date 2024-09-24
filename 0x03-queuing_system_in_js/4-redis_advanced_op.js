#!/usr/bin/env node

import { createClient, print } from 'redis';

//  start connection
const client = createClient();

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});
client.on('connect', () => {
  console.log('Redis client connected to the server');
});



// client.hset('HolbertonSchools', {
//     Portland: '50',
//     Seattle: '80',
//     'New York': '20',
//     Bogota: '20',
//     Cali: '40',
//     Paris: '2'
// })

// let userSession = await client.hgetall('user-session:123');
// console.log(JSON.stringify(userSession, null, 2));


//  hash using hset
const createHash = () => {
  const hashKey = 'HolbertonSchools';
  client.hset(hashKey, 'Portland', 50, print);
  client.hset(hashKey, 'Seattle', 80, print);
  client.hset(hashKey, 'New York', 20, print);
  client.hset(hashKey, 'Bogota', 20, print);
  client.hset(hashKey, 'Cali', 40, print);
  client.hset(hashKey, 'Paris', 2, print);
};

// display hash
const displayHash = () => {
  const hashKey = 'HolbertonSchools';
  client.hgetall(hashKey, (err, data) => {
    if (err) console.error(err);
    console.log(data);
  });
};

createHash();
displayHash();
