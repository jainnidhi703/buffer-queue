const redisInstance = require('redis');
const subscriber = redisInstance.createClient();

subscriber.on('pmessage', (pattern, channel, message) => {
  console.log(`Queue: ${channel} , Message: ${message}`);
});

subscriber.psubscribe('queue:*');
