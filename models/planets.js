const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  planetId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  longitude: {
    type: Number,
    default: 0
  },
  latitude: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Planet', planetSchema);
