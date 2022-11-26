const mongoose = require('mongoose')

const commentModel = new mongoose.Schema({
  username: String,
  content: String,
  postSlug: String,
  reply: Array
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentModel)