const redisInstance = require('redis');
const subscriber = redisInstance.createClient();

const queueName = process.argv[2];

if (queueName) {
  subscriber.subscribe(queueName);
} else {
  throw new Error('Pass a queue key');
}

subscriber.on('message', function(channel, message) {
  console.log(`Queue: ${channel} , Message: ${message}`);
});
