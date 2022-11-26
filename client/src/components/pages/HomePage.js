import React, {useState, useEffect} from 'react'
import { getPosts } from '../../api/PostApi'
import { makeStyles } from '@material-ui/styles';
import {Grid, Slider} from '@material-ui/core'
import AddImage from '../../img/Fashion-Instagram-Story-14.png'
import Banner from '../../img/Bia.png'
import Post from '../utils/post/Post'
import RemarkablePost from '../utils/post/RemarkablePost';
import RemarkablePost2 from '../utils/post/RemarkablePost2';
import SliderPosts from '../utils/SliderPosts';

const useStyle = makeStyles((theme) => ({
  // #e6e3e3
  homepage_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '60px',
  },
  homepage_body: {
    width: '75%',
    display: 'flex',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '20px',
    }
  },
  content: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }
  },
  remarkable_posts: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  post_list: {
    width: '100%',
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginTop: '0',
    }
  },
  add: {
    width: '30%',
    position: 'sticky',
    top: '20px',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  add_image: {
    width: '92%',
    height: '550px',
    objectFit: 'cover',
    position: 'absolute',
    right: '0'
  },
}))

function HomePage({user}) {
  const classes = useStyle()
  const [posts, setPosts] = useState([])

  const initializePosts = async () => {
    try {
      setPosts(await getPosts())
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    initializePosts()
  }, [])


  return (
    <div className={classes.homepage_container}>
      <div className="banner">
        <img src={Banner} alt="banner" className="banner_img" />
      </div>
      <div className={classes.homepage_body}>
        <div className={classes.content}>

          {/* remarkable post  */}
          <div className={classes.remarkable_posts}>
            {posts?.length > 0 && <RemarkablePost post={posts[posts.length-2]} />}
            {posts?.length > 0 && <RemarkablePost2 post={posts[posts.length-3]} />}
          </div>
          <SliderPosts favouritePosts={posts?.slice(0, 12)} />

          {/* post list */}
          <div className={classes.post_list}>
            {posts.map((post) => {
              return <Post key={post?._id} post={post} user={user} posts={posts} setPosts={setPosts}  />
            })}
          </div>
        </div>

        <div className={classes.add}>
          <img src={AddImage} alt="add" className={classes.add_image} />
        </div>
      </div>
    </div>
  )
}

export default HomePage