# Buffered Queue

`buffered-queue` is a queue implementation written in NodeJS and uses Redis for pub/sub.

## Get the dependencies
### Node.js v7
The source uses ES6+ features like destructuring, arrow functions, template strings, etc. thus it is adviced to use node.js v7+.

Use something like [nvm](https://github.com/creationix/nvm) to install node.js

### Redis (Optional)
**Mac (only)**: `brew install redis`

**Other Platforms**: Download it from the https://redis.io/

**Docker**: `docker run --name redis -d -p 6379:6379 redis:3.2.9 redis-server --appendonly yes`

### NPM Dependencies
```sh
$ npm i

# Or

$ yarn
```

## Config
If you wish not to install Redis, you can use a hosted redis, all you need to make it connect it to a remote redis-server is to pass the below environment variables.
```sh
$ REDIS_HOST=example.com/redis-server REDIS_PORT=1234
```
`REDIS_PORT` is optional, if not provided it will use the default redis port (i.e. 6379)

`REDIS_HOST` if not provided uses `localhost`

## How to run it?
```sh
$ npm start
```

## How to connect a client subscriber?
```sh
$ npm run subscriber <queueKey>
```
It starts a subscriber that waits for a message to be published on a given `queueKey`.

### How to publish a message?
```sh
# publishes a message to the queue
$ npm run post-publish-message <queueKey> <messageToPost> <size>
```
Size argument is only required in the 1st message for a given `queueKey`.
