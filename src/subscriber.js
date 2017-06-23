const redis = require('redis');
const { redisPort, redisHost } = require('./config');

const subscriber = redis.createClient(redisPort, redisHost);

const queueName = process.argv[2];

if (queueName) {
  subscriber.subscribe(queueName);
} else {
  throw new Error('Pass a queue key');
}

subscriber.on('message', function(channel, message) {
  console.log(`Received Message: ${message}, Queue: ${channel}`);
});
