const redis = require('redis');
const Promise = require('bluebird');
const { redisPort, redisHost } = require('../config');

Promise.promisifyAll(redis.RedisClient.prototype);

const map = {};
const publisher = redis.createClient(redisPort, redisHost);

async function addToBufferQueue({ queue, value, size }) {
  const reply = await publisher.lrangeAsync(queue, 0, -1);
  map[queue] = reply;

  const bufferSize = await publisher.hgetAsync('bufferSize', queue);

  if (!bufferSize) {
    if (size) {
      map[queue] = [];
      await publisher.hmsetAsync('bufferSize', queue, size);
      bufferSize = size;
    } else {
      throw new Error('size is mandatory for first message');
    }
  }

  if (bufferSize) {
    map[queue].push(value);
    await publisher.rpushAsync(queue, value);
  }

  if (map[queue] instanceof Array && map[queue].length == bufferSize) {
    console.log(`Queue: ${queue} Published:`, map[queue]);
    publisher.publish(queue, JSON.stringify(map[queue]));
    map[queue] = [];
    //TODO: If there are no subscribers for a queue LTRIM of redis can be used to limit the buffer size.
  }
}

module.exports = addToBufferQueue;
