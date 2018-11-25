require('dotenv').config();
const express = require('express');
const connect = require('./services/mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");

require('./services/facebook');

var cors = require('cors');

var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://lootto.netlify.com",
  "https://lootto.herokuapp.com"
];

var corsOptions = {
  origin: whitelist
};

app.use(cors(corsOptions));
app.use(passport.initialize({ session: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  next();
});

app.post("/register", (req, res) => {
  res.send(
    JSON.stringify({
      ok: true
    })
  );
});

connect()
  .then(db => {
    console.log("connected to mongodb");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch(err => {
    console.error("mongodb connection failed", err);
  });

// routes
const authController = require('./controller/AuthController');
const userController = require('./controller/UserController');
const planetsController = require('./controller/PlanetController');

const authenticate = passport.authenticate('facebook-token');

app.use('/auth', authController);
app.use('/user', authenticate, userController);
app.use('/planet', authenticate, planetsController);

app.get("*", function(request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});
