const router = require('express').Router()
const {getComments} = require('../controller/commentCtrl')

router.post('/get-comments', getComments)

module.exports = router