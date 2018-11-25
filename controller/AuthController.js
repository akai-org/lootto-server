const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');

const User = require('../models/user');

const router = express.Router();

router.post('/', passport.authenticate('facebook-token'), (req, res) => {
  const token = req.body.access_token;
  res.cookie('token', token).json(req.user);
});

module.exports = router;
