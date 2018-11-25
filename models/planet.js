const mongoose = require('mongoose');
const Chest = require('./chest');

const planetSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
  },
  chests: {
    type: [Chest.schema],
    default: undefined
  }
});

module.exports = mongoose.model('Planet', planetSchema);
