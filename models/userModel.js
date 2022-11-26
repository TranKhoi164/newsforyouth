const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/dfkkrqh2s/image/upload/v1644766813/ecommerce/Screenshot_2022-02-04_181853_u6m6cf.png"
  },
  role: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
})

const Users = mongoose.model('User', userModel)
module.exports = Users