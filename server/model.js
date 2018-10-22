const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/demo1'
mongoose.connect(DB_URL)
const models = {
  user:{
    "user":{'type':String,'require':true},
    "pwd":{'type':String,'require':true},
    "photo":{'type':String},
    "name":{'type':String},
    "age":{'type':String},
    'gender':{'type':String},
    "mood":{'type':String},
    "desc":{'type':String},
  },
  chat:{
    'chatId':{'type':String,'require':true},
    'from':{'type':String,'require':true},
    'to':{'type':String,'require':true},
    'read':{'type':Boolean,'default':false},
    'content':{'type':String,'require':true,'default':''},
    'create_time':{'type':Number,'require':true,'default':Date.now},
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}