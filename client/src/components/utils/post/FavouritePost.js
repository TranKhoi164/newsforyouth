import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  container: {
    width:'220px',
    textDecoration: 'none',
    height: '250px',
  },
  img: {
    width:'100%',
    height: '55%',
    objectFit:'cover',
    position: 'relative',
  },
  title_container: {
    width: '100%',
    height: '200px',
    position: 'relative',
    top: '-5px',
    textDecoration: 'none',
  },
  title: {
    paddingTop: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#242424',
    wordSpacing: '-2px',
    width: '90%',
    marginLeft: '5%',
  },
}))

function FavouritePosts({post}) {
  const classes = useStyle()
  
  return (
    <div className={classes.container}>
      <Link to={'/detail/' + post?.slug}><img src={post?.image} alt={post?.title} className={classes.img} /></Link>
      <Link  to={'/detail/' + post?.slug} className={classes.title_container}>
        <div className={classes.title}>
          {post?.title}
        </div>
      </Link>
    </div>
  )
}

export default FavouritePosts