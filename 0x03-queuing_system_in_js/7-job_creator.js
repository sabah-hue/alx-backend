#!/usr/bin/env node
// var kue = require('kue')
//   , queue = kue.createQueue();
import { createQueue } from 'kue';


const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Create queue
const queue = createQueue({name: 'push_notification_code'});

// for (var d of jobs) {
//     var job = queue.create('push_notification_code_2', d).save( function(err){
//        if( !err ) console.log(`Notification job created: ${job.id}`);
//        if(err) console.log(`Error creating notification job: ${err}`);
//     });
    
//     job.on('complete', function(){
//         console.log(`Notification job ${job.id} completed`);
      
//       }).on('failed', function(){
//         console.log(`Notification job ${job.id} failed: ${err}`);
      
//       }).on('progress', (progress, data) => {
//         console.log(`Notification job ${job.id} ${progress}% complete`);
//       })
// }


for (const job of jobs) {
  const result = queue.create('push_notification_code_2', job)
    .on('complete', () => {
      console.log(`Notification job ${result.id} completed`);
    })
    .on('failed', (err) => {
      console.log(`Notification job ${result.id} failed: ${err}`);
    })
    .on('progress', (progress, data) => {
      console.log(`Notification job ${result.id} ${progress}% complete`);
    })
    .save((err) => {
      if (err) {
        console.log(`Error creating notification job: ${err}`);
      } else {
        console.log(`Notification job created: ${result.id}`);
      }
    });
}
