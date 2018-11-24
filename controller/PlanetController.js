const mongoose = require('mongoose');
const express = require('express');

const Planet = require('../models/planet');

const router = express.Router();

router.get('/', (req, res, next) => {
  Planet.find()
    .exec()
    .then(planets => {
      console.log(planets);
      res.status(200).json(planets);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error
      });
    });
});

router.get('/', (req, res, next) => {
  Planet.find({ planetId: req.params.planetId })
    .exec()
    .then(planet => {
      console.log(planet);
      res.status(200).json(planet);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error
      });
    });
});

router.post('/', (req, res) => {
  const newPlanet = new Planet({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    chests: [
      mongoose.Types.ObjectId(),
      mongoose.Types.ObjectId(),
      mongoose.Types.ObjectId()
    ]
  });
  Planet.save(newPlanet);
});

module.exports = router;
