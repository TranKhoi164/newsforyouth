const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    text: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  categorySlug: {
    type: String
  },
  intro: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Post', postModel)