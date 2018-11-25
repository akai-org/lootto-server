const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
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
  },
  reward: {
    // reward in star currency
    type: Number,
    required: false // if it's not present, there is no reward in star currency
  }
});

module.exports = mongoose.model('Achievement', achievementSchema);
