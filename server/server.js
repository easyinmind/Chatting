const express = require('express')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const userRouter = require('./user')
const app = express()


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(9090, function(){
  console.log('node服务在9090启动成功！')
})