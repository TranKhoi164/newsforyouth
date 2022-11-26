import React, {useState} from 'react'
import { Button } from "@material-ui/core";
import axios from 'axios';

function FileUpload({post, setPost}) {
  const [imgLoading, setImgLoading] = useState(false)

  const URL = 'https://news-for-youth.herokuapp.com'

  const fileUpload = async (e) => {
    const files = e.target.files

    if (files) {
      setImgLoading(true)
      let formData = new FormData()
      formData.append("file", files[0])
      try {
        const upload_res = await axios.post(URL + '/api/upload-image', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        setImgLoading(false)
        setPost({...post, image: upload_res.data.url})
      } catch (e) {
        console.log(e.response.data.msg);
      }     
    }
  }

  return (
    <div style={{marginTop: '20px'}}>
      Chỉ nhận file .png/.jpeg<br />
      <Button>
        <label htmlFor="file_up" style={{ cursor: "pointer" }}>
          Add photo
        </label>
      </Button>
      {imgLoading ? 'Loading...' : post?.image}
      <input
        style={{ display: "none" }}
        accept="image/png, image/jpeg"
        onChange={fileUpload}
        type="file"
        name="file"
        id="file_up"
      />
    </div>
  )
}

export default FileUpload