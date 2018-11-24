const mongoose = require('mongoose');
const express = require('express');

const Planet = require('../models/planets');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send(
    JSON.stringify([
      {
        planetId: '1',
        name: 'marker1',
        type: 'planet1',
        longitude: 52.400512,
        latitude: 16.950136
      },
      {
        planetId: '2',
        name: 'marker2',
        type: 'planet1',
        longitude: 52.402512,
        latitude: 16.950136
      },
      {
        planetId: '3',
        name: 'marker3',
        type: 'planet2',
        longitude: 52.404512,
        latitude: 16.950136
      }
    ])
  );
});

module.exports = router;
