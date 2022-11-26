import React, {useState} from 'react'
import { makeStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import axios from 'axios'
import FileUpload from '../../utils/FileUpload';
import { createPost } from '../../../api/PostApi';

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


function CreatePostPage() {
  const classes = useStyle()
  const [post, setPost] = useState({
    title: '',
    intro: '',
    content: '',
    categorySlug: '',
    image: '',
  })
  const [err, setErr] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const createPost_res = await createPost(post)
      alert(createPost_res);
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
            <label htmlFor="title">Tiêu đề</label>
            <textarea required onChange={handleChange} placeholder='Tiêu đề' name='title' id='title' className={classes.input_field} />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="intro">Mở đầu</label>
            <textarea required onChange={handleChange} placeholder='Mở đầu' name='intro' id='intro' className={classes.input_field} />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="content">Nội dung</label>
            <textarea required onChange={handleChange} placeholder='Nội dung' name='content' id='content' className={classes.input_field} />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="categorySlug">Danh mục (không dấu, có gạch ngang giữa các chữ vd: thoi-su, am-thuc, ...)</label>
            <input required type="text" onChange={handleChange} placeholder='Danh mục' name='categorySlug' id='categorySlug' className={classes.input_field} />
          </div>

          {/* upload image */}
          <FileUpload post={post} setPost={setPost} setErr={setErr} />
          <div className={classes.submit_container}>
            <button type='submit' className={classes.submit_btn}>ĐĂNG BÀI VIẾT</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostPage