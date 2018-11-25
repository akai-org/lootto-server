const mongoose = require('mongoose');

const powerUpSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false // if it's not present, use the default image
  }
});

module.exports = mongoose.model('PowerUp', powerUpSchema);
