/**
 * Starts a subscriber client on a particular queue Qi
 */

const redis = require('redis');
const Promise = require('bluebird');
const { redisPort, redisHost } = require('../config');

Promise.promisifyAll(redis.RedisClient.prototype);
const subscriber = redis.createClient(redisPort, redisHost);
const redisConn = redis.createClient(redisPort, redisHost);
const queueName = process.argv[2];

async function main(queueName) {
  if (queueName) {
    subscriber.subscribe(queueName);
    console.log('subscribed queue: ', queueName);
  } else {
    console.log('Pass a queue key');
    process.exit(1);
  }
}

main(queueName);

subscriber.on('message', async (channel, message) => {
  console.log(`Received Message: ${message}, Queue: ${channel}`);
  //TODO: Item can be deleted post processing.
  try {
    const replyOk = await redisConn.delAsync(queueName);
    console.log('replyOk', replyOk);
    if (replyOk) {
      //post processing
      console.log('post processing');
    }
  } catch (err) {
    console.error(err);
  }
});
