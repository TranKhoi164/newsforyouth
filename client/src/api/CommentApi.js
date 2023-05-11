import axios from "axios"
import { URL } from "../globalVar"

//https://news-for-youth.herokuapp.com


const getComments = async (postSlug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comments = await axios.post(URL + '/comment/get-comments', {
        postSlug: postSlug
      })
      resolve(comments.data.comments)
    } catch (e) {
      reject(e.response.data.msg)
    }
  })
}

export { getComments }