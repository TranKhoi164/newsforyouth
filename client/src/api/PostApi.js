import axios from 'axios'
import { URL } from '../globalVar'

//https://news-for-youth.herokuapp.com

const createPost = async (post) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPost = await axios.post(URL + '/post/create-post', {
        ...post
      })
      resolve(newPost.data.msg)
    } catch (e) {
      reject(e?.response)
    }
  })
}

const deletePost = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletePostRes = await axios.post(URL + '/post/delete-post', {
        id: id
      })
      resolve(deletePostRes.data.msg)
    } catch (e) {
      reject(e?.response)
    }
  })
}

const updatePost = async (post) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePostRest = await axios.patch(URL + '/post/update-post', {
        ...post
      })
      resolve(updatePostRest.data.msg)
    } catch (e) {
      reject(e?.response)
    }
  })
}

const getPosts = async () => {
  try {
    const posts = await axios.get(URL + '/post/get-posts')
    return posts.data.posts
  } catch (e) {
    return e.response.data.msg
  }
}

const getPost = async (slug) => {
  try {
    const post = await axios.post(URL +'/post/get-post', {
      slug: slug
    })
    return post.data.post
  } catch (e) {
    return e.response.data.msg
  }
}

const getPostsByCategory = async (categorySlug) => {
  try {
    const posts = await axios.post(URL + '/post/get-posts-by-category', {
      categorySlug: categorySlug
    })
    return posts.data.posts
  } catch (e) {
    return e.response.data.msg
  }
}

const getPostsBySearch = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await axios.post(URL +'/post/search-filter', {
        query: query
      })
      resolve(posts.data.posts)
    } catch (e) {
      reject(e.response.data.msg)
    }
  })
}

export { createPost, deletePost, updatePost, getPosts, getPost, getPostsByCategory, getPostsBySearch }