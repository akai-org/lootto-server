require('dotenv').config();
const express = require('express');
const connect = require('./services/mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
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

// routes
const userController = require('./controller/UserController');
const planetsController = require('./controller/PlanetController');

app.use('/user', userController);
app.use('/planet', planetsController);

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, 'build/index.html'));
});
