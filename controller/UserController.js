const mongoose = require('mongoose');
const express = require('express');

const User = require('../models/user');
const Achievement = require('../models/achievement');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(req.user);
});

// money <-> stars exchange
router.post('/', (req, res) => {
  const auth = req.headers.authorization;
  const { moneyBalance, starsBalance } = req.body;
  const updatedProps = {
    moneyBalance,
    starsBalance
  };

  User.update(
    { facebookId: auth },
    {
      $set: updatedProps
    }
  )
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Pomyślnie dokonano wymiany'
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.get('/achievements', (req, res) => {
  Achievement.find({}, (err, achievements) => {
    if (!err) {
      res.send(achievements);
    }
  });
});

module.exports = router;
