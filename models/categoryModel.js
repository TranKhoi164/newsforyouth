const mongoose = require('mongoose')

const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  }
})

const Categories = mongoose.model('Category', userModel)
module.exports = Categories