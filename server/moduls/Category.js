const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  class: { type: Number }
})

module.exports = mongoose.model('Category', schema)