const Users = require('../models/userModel')

const register = async (req, res) => {
  try {
    const {name, password} = req.body
    if (!name || !password) {
      return res.status(400).json({msg: 'Missing credentials'})
    }
    const checkUser = await Users.findOne({name: name})
    if (checkUser) {
      return res.status(400).json({msg: 'User already exist'})
    }

    const newUser = new Users({
      name: name,
      password: password
    })
    await newUser.save()

    const resUser = {
      ...newUser._doc,
    }
    return res.json({msg: 'Tạo tài khoản thành công', user: resUser})
  } catch(e) {
    return res.status(500).json({ msg: e.message })
  }
}

const login = async (req, res) => {
  try {
    const {name, password} = req.body

    if (!name || !password) {
      return res.status(400).json({msg: 'Missing credentials'})
    }
    const user = await Users.findOne({name: name})
    if (!user) {
      return res.status(400).json({msg: 'Người dùng chưa đăng ký'})
    }
    if (password !== user.password) {
      return res.status(4000).json({msg: 'Mật khẩu không hợp lệ'})
    }
    return res.json({msg: 'Đăng nhập thành công', user: user})
  } catch (e) {
    return res.status(500).json({ msg: e.message})
  }
}

module.exports = {
  register: register,
  login: login
}