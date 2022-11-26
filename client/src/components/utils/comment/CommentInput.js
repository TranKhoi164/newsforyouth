import React, { useRef, useEffect} from 'react'
import {makeStyles, Button} from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

const useStyle = makeStyles(theme => ({
  formInput: {
    margin: '10px 0',
    width: '100%',
    position: 'relative',
    "& input": {
      width: '100%',
      marginBottom: '10px',
      border: '1px solid #ccc',
      padding: '5px 10px',
      minHeight: '40px',
      outline: 'none'
    },
    "& button" : {
      marginLeft: '69%',
      marginTop: '10px',
      width: '30%',
      borderRadius: 'none',
      position: 'relative',
      right: '0',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '50%',
        width: '45%',
      }
    },
  },
  texta: {
    height: "60px",
    width: "90%",
    border: "1px solid #ccc",
    outline: "none",
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px'
    }
  }
}))

function CommentInput({commentId, postSlug, socket, name, setReply, send, user}) {
  const classes = useStyle()
  const contentRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (name) {
      contentRef.current.value = `${name}`
    }
  }, [name])

  const commentSubmit = () => {
    if (Object.keys(user).length > 0) {
      const content = contentRef.current.value

      if (!content.trim()) return alert("Not Empty!");

      socket.emit('createComment', {
        username: user.name,
        content: content,
        postSlug: postSlug,
        commentId: commentId,
        send: send
      })
      contentRef.current.value = ''

      if (setReply) setReply(false)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className={classes.formInput}>
      <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '10px'}}>
        <Avatar alt='user' src="https://res.cloudinary.com/dfkkrqh2s/image/upload/v1644766813/ecommerce/Screenshot_2022-02-04_181853_u6m6cf.png" />
        <textarea 
          ref={contentRef}
          className={classes.texta}
          
        />
      </div>
      <Button color='primary' variant='contained' onClick={commentSubmit}>Gửi</Button>
  
    </div>
  )
}

export default CommentInput