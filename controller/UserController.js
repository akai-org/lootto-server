const mongoose = require('mongoose');
const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) =>
  res.send(
    JSON.stringify({
      userId: 'asdsadsa',
      firstName: 'Stefan',
      wallet: { stars: 10 }
    })
  )
);

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

module.exports = router;
