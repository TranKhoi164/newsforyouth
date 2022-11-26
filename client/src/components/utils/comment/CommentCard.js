import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Avatar } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  commentCard: {
    maxWidth: '100%',
    padding: '10px',
    margin: '10px 0',
    display: 'flex',
    borderTop: '1px solid #b4b5b8',
    '& h3': {
      color: 'darkblue'
    },
    '& span': {
      marginRight: '10px'
    },
    '& p': {
      color: '#444',
    }
  },
  commentCard_body: {
    marginLeft: '10px',
    width: '100%'
  },
  username: {
    fontWeight: 'bold',
    fontSize:' 17px',
  },
}))

function CommentCard({children, comment}) {
  const classes = useStyle()
  return (
    <div className={classes.commentCard}>
      <Avatar alt='user' src="https://res.cloudinary.com/dfkkrqh2s/image/upload/v1644766813/ecommerce/Screenshot_2022-02-04_181853_u6m6cf.png" />
      <div className={classes.commentCard_body}>
        <div className={classes.commentCardRow}>
          <div className={classes.username}>{comment.username}</div>
        </div>

        <div>{comment.content}</div>
        {children}
      </div>
    </div>
  )
}

export default CommentCard