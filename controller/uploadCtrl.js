const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const uploadImage = async (req, res) => {
  try {
    const file = req.files.file
    // console.log(file);

    cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'nfy/images',
    }, async (err, result) => {
      if (err) throw new Error(err)

      console.log(result);
      return res.json({public_id: result.public_id, url: result.secure_url})
    })
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

module.exports = {
  uploadImage: uploadImage
}