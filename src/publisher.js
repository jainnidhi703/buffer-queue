const express = require('express');
const publisher = require('redis').createClient();

const router = express.Router();

const map = {};
const bufferSizes = {};

function addToBufferQueue({ queue, value, size }) {
  if (!map[queue]) {
    if (size) {
      map[queue] = [];
      bufferSizes[queue] = size;
    } else {
      throw new Error('size is mandatory for first message');
    }
  }
  if (bufferSizes[queue]) {
    map[queue].push(value);
  }
  if (map[queue] instanceof Array && map[queue].length == bufferSizes[queue]) {
    console.log(`Queue: ${queue} Published:`, map[queue]);
    publisher.publish(queue, JSON.stringify(map[queue]));
    map[queue] = [];
  }
}

router.post('/', (req, res) => {
  const body = req.body;
  if (body.queue && body.value) {
    try {
      addToBufferQueue(body);
      res.send('Added message to Queue!!!');
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(400).send('Invalid Request!!!');
  }
});

module.exports = router;
