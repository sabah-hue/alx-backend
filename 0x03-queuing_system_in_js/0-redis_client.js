import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log(`Redis client not connected to server: ${err.message}`));

client.on('connect', () => console.log('Redis client connected to the server'))

// await client.connect();
// console.log('Redis client connected to the server')
