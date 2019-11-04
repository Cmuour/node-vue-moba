const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String },
  advertising: [{
    image: { type: String },
    url: { type: String },
    title: { type: String }
  }]
})

module.exports = mongoose.model('Ad', schema)