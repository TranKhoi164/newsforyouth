import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  container: {
    width:'66%',
    height: '450px',
  },
  img: {
    width:'100%',
    height: '300px',
    objectFit:'cover',
    marginBottom: '10px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '25px',
    color: '#242424',
    textDecoration: 'none',
    wordSpacing: '-2px',
    lineHeight: '30px'
  },
  intro: {
    marginTop: '10px'
  }
}))

function RemarkablePost({post}) {
  const classes = useStyle()
  
  return (
    <div className={classes.container}>
      <Link to={`/detail/${post?.slug}`}><img src={post?.image} alt={post?.title} className={classes.img} /></Link>
      <Link to={`/detail/${post?.slug}`} className={classes.title}>
        {post?.title}
      </Link>
      <div className={classes.intro}>{post?.intro.length > 120
            ? post?.intro.substring(0, 120) + "..."
            : post?.intro}</div>
    </div>
  )
}

export default RemarkablePost