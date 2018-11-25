const mongoose = require('mongoose');
const express = require('express');

const Planet = require('../models/planet');
const Chest = require('../models/chest');

const router = express.Router();

// get all plantes
router.get('/', (req, res, next) => {
  Planet.find()
    .populate('chests')
    .exec()
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error
      });
    });
});

// get certain planet
router.get('/:planetId', (req, res, next) => {
  Planet.findOne({ _id: req.params.planetId })
    .exec()
    .then(planet => {
      res.status(200).json(planet);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error
      });
    });
});

const generateChest = num => {
  return Array(num)
    .fill(1)
    .map(_ => {
      const id = mongoose.Types.ObjectId();
      const chest = new Chest({
        _id: id,
        type: `chest${Math.floor(Math.random() * 5)}`,
        name: `chest-${String(id).substring(String(id).length - 8)}`
      });
      chest.save().then(res => {});
      return chest;
    });
};

// creating planets
router.post('/', (req, res) => {
  const id = generateChest(6);
  new Planet({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    chests: id
  })
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Nowa planeta stworzona'
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// drop planets
router.delete('/dropplannets', (req, res) => {
  Chest.collection.drop();
  Planet.collection.drop();
  res.status(200).json({
    message: 'db dropped'
  });
});

// deleting planets
router.delete('/:id', (req, res) => {
  Planet.deleteOne({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'success'
      });
    });
});

// add planets blob
router.post('/addblob', (req, res) => {
  Array(6)
    .fill(1)
    .map(_ => {
      const chests = generateChest(6);
      const id = mongoose.Types.ObjectId();
      const p = new Planet({
        _id: id,
        name: `planeta-${String(id).substring(String(id).length - 8)}`,
        type: `planet${Math.floor(Math.random() * 2) + 1}`,
        longitude: req.body.longitude + (Math.random() - 0.5) * 1,
        latitude: req.body.latitude + (Math.random() - 0.5) * 1,
        chests: chests
      });
      p.save()
        .then(result => {
          res.status(200).json({ message: 'udało się utworzyć planety' });
        })
        .catch(error => {
          // console.error(error);
          res.status(500).json({ error });
        });
      return p._id;
    });
});

module.exports = router;
