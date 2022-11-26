import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { getPost } from '../../api/PostApi'
import { makeStyles } from '@material-ui/styles'
import ChatIcon from '@material-ui/icons/Chat';
import HomeIcon from '@material-ui/icons/Home';
import AddImage from '../../img/Fashion-Instagram-Story-14.png'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import { getComments } from '../../api/CommentApi';
import CommentInput from '../utils/comment/CommentInput';
import Comment from '../utils/comment/Comment';
import {getPostsByCategory} from '../../api/PostApi'
import Post from '../utils/post/Post'
import Banner from '../../img/Bia.png'

//const URL ='https://news-for-youth.herokuapp.com'
const URL = 'http://localhost:5000'
const socket = io(URL)

const useStyle = makeStyles((theme) => ({
  detail_page: {
    background: '#f2f2f2',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    width: '80%',
    background: 'white',
    marginTop: '25px',
    paddingBottom: '60px',
    border: '1px solid #ebebeb',
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    }
  },
  content_container: {
    width: '85%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  title: {
    color: '#242424',
    borderBottom: '1px solid #d4d4d2',
  },
  category: {
    fontSize: '15px',
    fontWeight: '620',
    color: '#1263c9',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  real_container: {
    padding: '40px',
    display: 'flex',
    position: 'relative',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    }
  },
  content: {
    marginTop: '25px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'center',
    }
  },
  btn_group: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    }
  },
  btn: {
    fontSize: '50px',
    color: '#a3a0a0',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  home_btn: {
    fontSize: '30px',
    padding: '5px',
    background: '#0d96d6',
    color: 'white',
    borderRadius: '50%'
  },

  intro: {
    fontWeight: 'bold',
    color: '#242424',
  },
  img: {
    maxWidth: '100%',
    marginTop: '20px'
  },
  content_body: {
    width: '90%',
  },
  content_body_detail: {
    fontFamily: 'Times New Roman',
    lineHeight: '1.5',
    fontSize: '17px',
    marginTop: '30px',
    whiteSpace: 'pre-line',
    paddingBottom: '60px',
    borderBottom: '3px solid #adadad',
  },
  add: {
    width: '30%',
    position: 'sticky',
    marginTop: '20px',
    top: '30px',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  add_image: {
    width: '90%',
    height: '550px',
    objectFit: 'cover',
    position: 'absolute',
    right: '0',
  },
  post_list_container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  post_list: {
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    }
  }
}))

function DetailPage({user}) {
  const navigate = useNavigate()
  const classes = useStyle()
  const {slug} = useParams()
  const [post, setPost] = useState({})
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  const getPostDetail = async () => {
    try {
      const post_req = await getPost(slug)
      setPost(post_req)
      setPosts(await getPostsByCategory(post_req?.categorySlug))
    } catch (e) {
      console.log({err: e});
    }
  }

  useEffect(() => {
    getPostDetail()
  }, [slug])

  useEffect(() => {
    window.scrollTo(0, 0)
    socket.emit('joinRoom', slug)
    const getCommentsOfPost = async () => {
      try { 
        setComments(await getComments(slug))
      } catch (e) {
        console.log(e);
      }
    }
    getCommentsOfPost()
  }, [slug])

  //get comment realtime
  useEffect(() => {
    if (socket) {
      socket.on('sendCommentToClient', newComment => {
        setComments([newComment, ...comments])
      })
    }

    return () => socket?.off('sendCommentToClient')
  }, [socket, comments])

  useEffect(() => {
    if (socket) {
      socket.on('sendReplyCommentToClient', comment => {
        const newArr = [...comments]
        newArr.forEach(cm => {
          if (cm._id === comment._id) {
            cm.reply = comment.reply
          }
        })
        setComments(newArr)
      })
    }

    return () => socket?.off('sendReplyCommentToClient')
  }, [socket, comments])  

  return (
    <div className={classes.detail_page}>
      <div className="banner">
        <img src={Banner} alt="banner" className="banner_img" />
      </div>
      <div className={classes.container}>
        <div className={classes.real_container}>
          <div className={classes.content_container}>
            <div className={classes.title}>
              <h1 style={{wordSpacing: '-2px', marginTop: '0'}}>{post?.title}</h1>
              <div className={classes.category}>
                {post.categorySlug === 'goc-chia-se' && 'Góc chia sẻ'}
                {post.categorySlug === 'truyen-thong' && 'Truyền thống'}
                {post.categorySlug === 'suc-khoe' && 'Sức khỏe'}
                {post.categorySlug === 'am-thuc' && 'Ẩm thực'}
                {post.categorySlug === 'xu-huong' && 'Xu hướng'}
                {post.categorySlug === 'tinh-yeu' && 'Tình yêu'}
                {post.categorySlug === 'cong-nghe' && 'Công nghệ'}
              </div>
            </div>
            <div className={classes.content}>
              <div className={classes.btn_group}>
                <a href="#cmt"><ChatIcon className={classes.btn}/></a>
                <HomeIcon onClick={() => {navigate('/')}} className={`${classes.btn} ${classes.home_btn}`}/>
              </div>
              <div className={classes.content_body}>
                <div className={classes.intro}>{post.intro}</div>
                <img src={post.image} alt={post.title} className={classes.img} />
                <div className={classes.content_body_detail}>{post.content}</div>
                <div id='cmt' style={{fontFamily: 'Times New Roman', fontSize: '30px', marginTop: '20px'}}>Bình luận</div>
                <CommentInput user={user} postSlug={post.slug} socket={socket} />
                <div className={classes.commentList}> 
                  {
                    comments.map(comment => {
                      return <Comment key={comment._id} user={user} comment={comment} socket={socket} />
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={classes.add}>
            <img src={AddImage} alt="add" className={classes.add_image} user={user} />
          </div>
        </div>
        <div className={classes.post_list_container}>
          <div className={classes.post_list}>
            <div style={{fontFamily: 'Times New Roman', marginBottom: '10px', fontSize: '30px'}}>Bài viết cùng chuyên mục</div>
            {
              posts.map(postt => {
                if (post._id !== postt._id) {
                  return <Post key={postt._id} user={user} post={postt} posts={posts} setPosts={setPosts} />
                } else {
                  return null
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage