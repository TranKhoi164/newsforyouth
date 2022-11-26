const Comments = require('../models/commentModel')

const getComments = async (req, res) => {
  try {    
    const comments = await Comments.find({postSlug: req.body.postSlug}).sort('-createdAt')
    
    return res.json({comments})
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

module.exports = {
  getComments: getComments
}