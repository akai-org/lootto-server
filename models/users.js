const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  moneyBalance: {
    type: Number,
    min: 0,
    default: 0
  },
  starsBalance: {
    type: Number,
    min: 0,
    default: 0
  },
  experience: {
    type: Number,
    min: 0,
    default: 0
  },
  powerUps: [Number],
  achievements: [Number]
});

module.exports = mongoose.model('User', userSchema);
