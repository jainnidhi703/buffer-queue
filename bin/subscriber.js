/**
 * Starts a subscriber client on a particular queue Qi
 */

const redis = require('redis');
const { redisPort, redisHost } = require('./config');

const subscriber = redis.createClient(redisPort, redisHost);

const queueName = process.argv[2];

if (queueName) {
  subscriber.subscribe(queueName);
} else {
  console.log('Pass a queue key');
  process.exit(1);
}

subscriber.on('message', (channel, message) => {
  console.log(`Received Message: ${message}, Queue: ${channel}`);
});
