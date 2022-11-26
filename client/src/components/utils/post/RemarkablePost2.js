import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'

const useStyle=makeStyles((theme) => ({
  container: {
    width:'31%',
    height: '450px',
    marginLeft: '20px',
    textDecoration: 'none',
  },
  img: {
    width:'100%',
    height: '300px',
    objectFit:'cover',
    position: 'relative',
  },
  title_container: {
    width: '100%',
    height: '200px',
    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(231,231,231,0.9332107843137255) 100%)',
    position: 'relative',
    top: '-5px'
  },
  title: {
    paddingTop: '10px',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#242424',
    wordSpacing: '-2px',
    width: '90%',
    marginLeft: '5%',
  },
}))

function RemarkablePost2({post}) {
  const classes = useStyle()
  
  return (
    <Link className={classes.container} to={`/detail/${post?.slug}`}>
      <img src={post?.image} alt={post?.title} className={classes.img} />
      <div className={classes.title_container}>
        <div className={classes.title}>
          {post?.title}
        </div>
      </div>
    </Link>
  )
}

export default RemarkablePost2