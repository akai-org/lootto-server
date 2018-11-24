require('dotenv').config();
const express = require('express');
const connect = require('./services/mongodb');
const app = express();
const port = 3001;
const path = require('path');

var cors = require('cors');

var whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://lootto.netlify.com',
  'https://lootto.herokuapp.com'
];
var corsOptions = {
  origin: whitelist
};

app.use(cors(corsOptions));

app.get('/user', (req, res) =>
  res.send(
    JSON.stringify({
      userId: 'asdsadsa',
      firstName: 'Stefan',
      wallet: { stars: 10 }
    })
  )
);

app.get('/abc', (req, res) => res.send('Hello World!'));

connect()
  .then(db => {
    console.log('connected to mongodb');
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch(err => {
    console.error('mongodb connection failed', err);
  });

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, 'build/index.html'));
});
