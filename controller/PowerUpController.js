const express = require('express');

const router = express.Router();

const PowerUps = require('../models/powerUp');

router.get('/', (req, res) => {
  res.json(JSON.parse('[]'));
});

module.exports = router;
