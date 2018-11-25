const express = require('express');

const router = express.Router();

const Chest = require('../models/chest');

router.get('/', (req, res) => {
  res.json(JSON.parse('[]'));
});

module.exports = router;
