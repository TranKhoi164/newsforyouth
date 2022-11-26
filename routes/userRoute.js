const router = require('express').Router()

const { register, login } = require('../controller/userCtrl')

router.post('/register', register) //register
router.post('/login', login) //login

module.exports = router