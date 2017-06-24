const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const addToBufferQueue = require('./buffered-queue');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/****************
 * Routes
 ****************/

app.get('/', (req, res) => {
  res.send('Go to /publish to publish a message!');
});

app.post('/publish', (req, res) => {
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

/******************
 * Start Listening
 ******************/

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
