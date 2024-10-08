#!/usr/bin/env node
var kue = require('kue')
  , queue = kue.createQueue();

// Job data
var job = queue.create('push_notification_code', {
    phoneNumber: 4153518780,
    message: 'This is the code to verify your account',
  }).save( function(err){
   if( !err ) console.log(`Notification job created: ${job.id}`);
});

job.on('complete', function(result){
    console.log('Notification job completed');
  
  }).on('failed', function(errorMessage){
    console.log('Notification job failed');
  
  })
