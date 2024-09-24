#!/usr/bin/env node
import { createClient, print } from 'redis';
import { promisify } from 'util';

//  start connection
const client = createClient();

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// promisify
const getAsync = promisify(client.get).bind(client);

//  set key with value
export const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value, print);
}

//  get the value of the key
export const displaySchoolValue = async (schoolName) => {
    const value = await getAsync(schoolName);
    console.log(value);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
