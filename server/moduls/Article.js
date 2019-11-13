const mongoose = require('mongoose');

const schema = mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  title: { type: String },
  description: { type: String },
  bg_img: { type: String },
  content: { type: String },
},{
	timestamp: true
})

module.exports = mongoose.model('Article', schema)