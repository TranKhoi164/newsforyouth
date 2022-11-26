const router = require('express').Router()
const {createPost, deletePost, updatePost, getPosts, getPost, getPostsByCategory, searchFilter} = require('../controller/postCtrl')
const authAdmin = require('../middleware/authAdmin')

//admin page
router.post('/create-post', createPost) //create post
router.post('/delete-post', deletePost) //delete post
router.patch('/update-post', updatePost) //delete post


router.post('/get-post', getPost)
router.get('/get-posts', getPosts)
router.post('/get-posts-by-category', getPostsByCategory)
router.post('/search-filter', searchFilter)


module.exports = router
