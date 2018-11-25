const mongoose = require('mongoose');

const chestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Chest', chestSchema);
module.exports.schema = chestSchema;
