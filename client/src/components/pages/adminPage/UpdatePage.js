import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {Link, useLocation} from 'react-router-dom'
import { makeStyles } from "@material-ui/styles";
import axios from 'axios'
import FileUpload from '../../utils/FileUpload';
import { updatePost } from '../../../api/PostApi';

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  createPost_form: {
    width: '70%',

    marginTop: '50px',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    },
    '& textarea': {
      height: '100px'
    }
  },
  input_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    marginTop: '13px',
  },
  input_field: {
    border: '1px solid #ccc',
    width: '100%',
    height: '35px',
    marginTop:'5px',
  },
  submit_container: {
    marginTop: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end'
  },
  submit_btn: {
    width: '100%',  
    cursor: 'pointer',
    height: '40px',
    marginTop: '10px',
    background: '#0d96d6',
    border: 'none',
    fontWeight: '550',
    color: 'white',
    borderRadius: '5px',
  },
  err_message: {
    color: 'red',
    marginTop: '20px',
  }
}))


function UpdatePage() {
  const classes = useStyle()
  const {slug} = useParams()
  const location = useLocation()
  const [post, setPost] = useState({})
  const [err, setErr] = useState('')

  useEffect(() => {
    setPost(location.state)
  }, [slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatePost_res = await updatePost(post)
      alert(updatePost_res);
    } catch (e) {
      alert(e);
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    setPost({
      ...post,
      [name]: value
    })
  }

  console.log({post});

  return (
    <div className={classes.container}>
      <div className={classes.createPost_form}>
        <form onSubmit={handleSubmit} style={{marginTop: '0', width: '80%'}}>
          <div className={classes.input_container}>
            <label htmlFor="title">Ti??u ?????</label>
            <textarea required onChange={handleChange}  name='title' id='title' className={classes.input_field} value={post.title}></textarea>
          </div>
          <div className={classes.input_container}>
            <label htmlFor="intro">M??? ?????u</label>
            <textarea required onChange={handleChange}  name='intro' id='intro' className={classes.input_field} value={post.intro} />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="content">N???i dung</label>
            <textarea required onChange={handleChange} placeholder='N???i dung' name='content' id='content' className={classes.input_field} value={post.content}  />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="categorySlug">Danh m???c (kh??ng d???u, c?? g???ch ngang gi???a c??c ch??? vd: thoi-su, am-thuc, ...)</label>
            <input value={post.categorySlug} required type="text" onChange={handleChange} placeholder='Danh m???c' name='categorySlug' id='categorySlug' className={classes.input_field} />
          </div>

          {/* upload image */}
          <FileUpload post={post} setPost={setPost} setErr={setErr} />
          <div className={classes.submit_container}>
            <button type='submit' className={classes.submit_btn}>S???A B??I VI???T</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePage