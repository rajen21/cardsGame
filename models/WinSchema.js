const mongoose = require('mongoose');

const winSchema = mongoose.Schema({
  game: {
    type: JSON,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('game', winSchema);
