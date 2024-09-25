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

// subscribe to the channel holberton school channel
client.subscribe('holberton school channel');

// unsubscribe and quit
client.on('message', (channel, message) => {
  console.log(`${message}`);
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});
