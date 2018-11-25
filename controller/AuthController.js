const mongoose = require('mongoose');
const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  const token = req.body.access_token;
  res.cookie('token', token).json(req.user);
});

module.exports = router;
