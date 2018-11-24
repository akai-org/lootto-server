const mongoose = require('mongoose');
const express = require('express');

const User = require('../models/users');

const router = express.Router();

router.get('/', (req, res) =>
  res.send(
    JSON.stringify({
      userId: 'asdsadsa',
      firstName: 'Stefan',
      wallet: { stars: 10 }
    })
  )
);

module.exports = router;
