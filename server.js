require('dotenv').config()
const express = require('express')
const fileUpLoad = require('express-fileupload')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const Comments = require('./models/commentModel')

const app = express()


//TODO: create websocket server
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  }
})

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', process.env.CLIENT_URL];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

// app.use(cors({
//   origin: process.env.CLIENT_URL
// }))
app.use(express.json())
app.use(fileUpLoad({
  useTempFiles: true
}))

//TODO: connect to database
const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl, {
  useNewUrlParser: true
}, err => {
  if (err) {
    throw new Error(err)
  } else console.log('Connect to mongodb');
})

const PORT = process.env.PORT || 5000

app.use('/user', require('./routes/userRoute'))
app.use('/post', require('./routes/postRoute'))
app.use('/comment', require('./routes/commentRoute'))
app.use('/api', require('./routes/uploadRoute'))

app.get('/healthz', (req, res) => {
  return res.status(200).send()
})

app.post('/', (req, res) => {
  return res.json({req_body: req.body})
})

app.get('/', (req, res) => {
  return res.json({
    test: 'hello'
  })
})

//TODO: connect to socket io
io.on('connection', socket => {
  // console.log(socket.id + ' connected');

  let users = []
  socket.on('joinRoom', postSlug => { //room id is post slug
    const user = {
      userId: socket.id,
      roomId: postSlug
    }

    //check if user already exist
    const indx = users.findIndex(user => user.userId === socket.id)
  
    if (indx === -1) {
      users.push(user)
      socket.join(user.roomId)
    } else {
      socket.leave(users[indx]?.roomId)
      users[indx].roomId = postSlug
      socket.join(postSlug)
    }
    // console.log({users});
  })

  socket.on('createComment', async commentInfo => {
    console.log({commentInfo})
    const newComment = new Comments({
      username: commentInfo?.username, 
      postSlug: commentInfo?.postSlug, 
      content: commentInfo?.content
    })
    
    if (commentInfo.send === 'replyComment') {
      const {_id, username, content, postSlug} = newComment

      const comment = await Comments.findByIdAndUpdate(commentInfo?.commentId, {
        $push: { reply: {_id, username, content, postSlug} }
      }, {new: true})
      
      io.to(commentInfo.postSlug).emit('sendReplyCommentToClient', comment)
    } else {
      await newComment.save()
      io.to(commentInfo.postSlug).emit('sendCommentToClient', newComment)
    }
  })
})


server.listen(5000, () => {
  console.log('Server is running on port ' + 5000);
})
