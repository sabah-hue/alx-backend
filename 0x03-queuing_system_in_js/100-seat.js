#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createQueue } from 'kue';
import { createClient } from 'redis';

// express server
const app = express();

// create Client
const client = createClient({ name: 'reserve_seat' });
const queue = createQueue();

// start values
const initSeats = 50;
let reservationEnabled = false;

// reserve seat
const reserveSeat = async (number) => {
  return promisify(client.SET).bind(client)('available_seats', number);
};

// available seats
const getCurrentAvailableSeats = async () => {
  return promisify(client.GET).bind(client)('available_seats');
};

// routes
app.get('/available_seats', (req, res) => {
  getCurrentAvailableSeats()
    .then((numberOfAvailableSeats) => {
      res.json({ numberOfAvailableSeats })
    });
});

app.get('/reserve_seat', (_req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }
  try {
    const job = queue.create('reserve_seat');

    job.on('failed', (err) => {
      console.log(
        'Seat reservation job',
        job.id,
        'failed:',
        err.message || err.toString(),
      );
    });
    job.on('complete', () => {
      console.log('Seat reservation job',job.id,'completed');
    });
    job.save();
    res.json({ status: 'Reservation in process' });
  } catch {
    res.json({ status: 'Reservation failed' });
  }
});

app.get('/process', (_req, res) => {
  res.json({ status: 'Queue processing' });
  queue.process('reserve_seat', (_job, done) => {
    getCurrentAvailableSeats()
      .then((result) => (result || 0))
      .then((availableSeats) => {
        reservationEnabled = availableSeats <= 1 ? false : reservationEnabled;
        if (availableSeats >= 1) {
          reserveSeat(availableSeats - 1)
            .then(() => done());
        } else {
          done(new Error('Not enough seats available'));
        }
      });
  });
});
// reserved seat
const resetAvailableSeats = async (data) => {
  return promisify(client.SET)
    .bind(client)('available_seats', data);
};

app.listen(1245, () => {
  resetAvailableSeats(initSeats)
    .then(() => {
      reservationEnabled = true;
      console.log('Server running on port 1245');
    });
});

export default app;
