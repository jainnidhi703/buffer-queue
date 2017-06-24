const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const publish = require('./publisher.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('Go to /publish to publish a message!');
});

app.use('/publish', publish);

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
