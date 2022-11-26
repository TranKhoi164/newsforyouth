const route = require('express').Router()
const uploadCtrl = require('../controller/uploadCtrl')

route.post('/upload-image', uploadCtrl.uploadImage)

module.exports = route