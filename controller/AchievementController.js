const express = require('express');
const router = express.Router();

const Achievement = require('../models/achievement');

router.get('/', (req, res) => {
  res.json(JSON.parse('[]'));
});

module.exports = router;
