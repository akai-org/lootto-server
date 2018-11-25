const mongoose = require('mongoose');
const express = require('express');

const User = require('../models/user');
const Achievement = require('../models/achievement');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(req.user);
});

router.post('/buy', (req, res) => {
  const { stars, money } = req.body;
  const { user } = req;

  if (user.moneyBalance < stars) {
    res.status(422).json({ error: 'Brak wystarczających środków' });
    return;
  }
  user.starsBalance += stars;
  user.moneyBalance -= money;
  user.save().then(user => res.json(user));
});

router.post('/deposit', (req, res) => {
  const { amount } = req.body;
  const { user } = req;

  if (amount <= 0) {
    res.status(422).json({ error: 'Kwota musi być dodatnia' });
    return;
  }

  user.moneyBalance += amount;
  user.save().then(user => res.json(user));
});

router.post('/withdraw', (req, res) => {
  const { amount } = req.body;
  const { user } = req;

  if (amount <= 0) {
    res.status(422).json({ error: 'Kwota musi być dodatnia' });
    return;
  }
  if (amount > user.moneyBalance) {
    res.status(422).json({ error: 'Brak wystarczających środków' });
    return;
  }

  user.moneyBalance -= amount;
  user.save().then(user => res.json(user));
});

router.get('/achievements', (req, res) => {
  Achievement.find({}, (err, achievements) => {
    if (!err) {
      res.send(achievements);
    }
  });
});

module.exports = router;
