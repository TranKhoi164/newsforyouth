import React, {useState} from 'react'
import CommentCard from './CommentCard'
import CommentInput from './CommentInput'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  navComment: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'orange',
    '& p': {
      cursor: 'pointer',
      margin: '10px'
    },
    '& p:hover': {
      textDecoration: 'underline'
    }
  }
}))

function Comment({comment, socket, user}) {
  const classes = useStyle()
  const [reply, setReply] = useState(false)
  const [name, setName] = useState('')

  const handleReply = (username) => {
    setReply(true)
    setName(username)
  }

  return (
    <>
      <CommentCard comment={comment}>
        <div className={classes.navComment}>
          <p onClick={() => handleReply(comment.username)}>Trả lời</p>
        </div>

        <div className="reply_comment">
          {
            comment.reply.map(rep => {
              return <CommentCard comment={rep} key={rep._id}>
                
              </CommentCard>
            })
          }
        </div>

        {reply && <CommentInput
          commentId={comment._id}
          postSlug={comment.postSlug}
          socket={socket}
          name={name}
          setReply={setReply}
          send="replyComment"
          user={user}
        />}
      </CommentCard>
    </>
  )
}

export default Comment