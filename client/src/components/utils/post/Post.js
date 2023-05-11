import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom'
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { deletePost } from '../../../api/PostApi';

const useStyle = makeStyles((theme) => ({
  post_container: {
    width: '100%',
    height: '200px',
    borderBottom: '1px solid #d9d9d9',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      paddingBottom: '10px',
      marginBottom: '15px',
      borderBottom: 'none',
    }
  }, //box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  content: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
    }
  },
  image: {
    width: '240px',
    height: '150px',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '200px',
    }
  },
  introduce: {
    marginLeft: '20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
    }
  },
  title: {
    fontWeight: 'bold',
    fontSize: '19px',
    color: '#242424',
    textDecoration: 'none',
    position: 'relative',
    top: '-5px',
    wordSpacing: '-2px',
  },
  category: {
    color: '#082a61',
    margin: '10px 0',
    fontSize: '15px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  time: {
    color: '#858585',
    fontWeight: '400'
  },
  intro: {
    color: '#4d4d4d',
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))

function Post({post, user, posts, setPosts}) {
  const classes = useStyle()

  const adminAcc = () => {
    return <div style={{textAlign: 'end'}}>
      <Link style={{color: 'black', textDecoration: 'none'}} 
          to={`/update/${post?._id}`}
          state={post}
          >
            <CreateIcon onClick={() => {}} /> 
          </Link>
      <DeleteForeverIcon 
        onClick={async () => {
          const dlt = await deletePost(post?._id)
          console.log(dlt)
          const newPosts = posts.filter(postt => {
            return postt?._id !== post?._id
          })
          setPosts(newPosts)
        }} 
        style={{cursor: 'pointer'}}
      />
    </div>
  }

  return (
    <div className={classes.post_container}>
      <div className={classes.content}>
        <Link to={`/detail/${post?.slug}`} style={{display: 'flex'}}><img src={post?.image} alt="post-img" className={classes.image} /></Link>
        <div className={classes.introduce}>
          <Link to={`/detail/${post?.slug}`} className={classes.title}>
            {post?.title?.length > 120
            ? post?.title.substring(0, 120) + "..."
            : post?.title}
          </Link>
          <div className={classes.category}>
            {post?.categorySlug === 'goc-chia-se' && 'Góc chia sẻ'} 
            {post?.categorySlug === 'truyen-thong' && 'Truyền thống'} 
            {post?.categorySlug === 'suc-khoe' && 'Sức khỏe'} 
            {post?.categorySlug === 'am-thuc' && 'Ẩm thực'} 
            {post?.categorySlug === 'xu-huong' && 'Xu hướng'} 
            {post?.categorySlug === 'tinh-yeu' && 'Tình yêu'} 
            {post?.categorySlug === 'cong-nghe' && 'Công nghệ'} 
          </div>
          <div className={classes.intro}>{post?.intro?.length > 120
            ? post?.intro?.substring(0, 120) + "..."
            : post?.intro}
          </div>
          {user?.name === 'admin' && adminAcc()}
        </div>
      </div>
    </div>
  )
}

export default Post