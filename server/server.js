const express = require('express')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection',function(socket){
  console.log('socKet connected')
  socket.on('sendMsg',function(data){
    console.log(data)
    const from = data.from
    const to = data.to
    const content = data.msg
    const chatId = [from,to].sort().join('_')
    Chat.create({from,to,content,chatId},function(err,doc){
      console.log(doc)
      if(!err){
        io.emit('receMsg',Object.assign({},doc._doc))
      }
    })
  })
})

const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9090, function () {
  console.log('node服务在9090启动成功！')
})