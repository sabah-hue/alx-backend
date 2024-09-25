#!/usr/bin/env node
var kue = require('kue')
  , queue = kue.createQueue();


// sendNotification
const sendNotification = (phoneNumber, message) => {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
};


// queue 
queue.process('push_notification_code', (job, done) => {
  const res = job.data;
  sendNotification(res.phoneNumber, res.message);
  done();
});
