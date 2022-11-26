const Posts = require('../models/postModel')
var slugify = require('slugify')

const createPost = async (req, res) => {
  try {
    const {title, intro, categorySlug, content, image} = req.body
    const newPost = new Posts({
      title: title,
      intro: intro,
      slug: slugify(title),
      categorySlug: categorySlug,
      content: content,
      image: image
    })
    await newPost.save()
    return res.json({msg: 'Create new post successfully', post: newPost})
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

const deletePost = async (req, res) => {
  try {
    console.log({id: req.body.id});
    await Posts.findByIdAndDelete(req.body.id)
    return res.json({msg: 'Xóa thành công'})
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

const updatePost = async (req, res) => {
  try {
    const {title, intro, categorySlug, content, image} = req.body
    const newPost = await Posts.findByIdAndUpdate(req.body._id, {
      title: title,
      intro: intro,
      slug: slugify(title),
      categorySlug: categorySlug,
      content: content,
      image: image
    }, {
      new: true
    })
    res.json({msg: 'Chỉnh sửa thành công', newPost: newPost})
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find({})
    return res.json({posts: posts})
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

const getPost = async (req, res) => {
  try {
    const post = await Posts.findOne({slug: req.body.slug})
    console.log({req: req.body});
    return res.json({post: post})
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

const getPostsByCategory = async (req, res) => {
  try {
    const posts = await Posts.find({categorySlug: req.body.categorySlug})
    return res.json({posts: posts})
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

const searchFilter = async (req, res) => {
  try {
    const {query} = req.body
    const posts = await Posts.find({$text: {$search: query}})

    if (posts?.length === 0) {
      return res.status(400).json({msg: 'Không tìm thấy kết quả'})
    }

    return res.json({posts: posts})
  } catch (e) {
    return res.status(500).json({msg: e.message})
  }
}

module.exports = {
  createPost: createPost,
  getPosts: getPosts,
  getPost: getPost,
  getPostsByCategory: getPostsByCategory,
  searchFilter: searchFilter,
  deletePost: deletePost,
  updatePost: updatePost
}