const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let publish = require('./redis-publisher.js');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/publish', publish);

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})