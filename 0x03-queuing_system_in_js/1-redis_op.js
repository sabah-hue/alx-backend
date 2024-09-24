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

//  set key with value
export const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value, print);
}
//  get the value of the key
export const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(reply);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
