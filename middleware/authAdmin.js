const { models } = require('mongoose')
const Users = require('../models/userModel')

const authAdmin = (req, res, next) => {
  try {
    const {username, password} = req.body
    if (username !== "admin" || password !== "1") {
      return res.status(400).json({msg: 'Không có quyền truy cập'})
    }
    next()
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

module.exports = authAdmin