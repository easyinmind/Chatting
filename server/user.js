const express = require('express')
const utlis = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {pwd:0,__v:0}
Router.get('/info',function(req,res){
    const { userId } = req.cookies
    if(!userId){
        return res.json({code:1})
    }
    User.findOne({_id:userId},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        return res.json({code:0,data:doc})
    })


})
Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        if(!err){
            return res.json({code:0,data:doc})
        }else{
            return res.json({code:1})
        }
        
    })
})
Router.get('/remove',function(req,res){
    User.remove({},function(err,doc){
        return res.json(doc)
    })
})
Router.post('/register', function (req, res) {
    console.log(req.body)
    const { user, pwd } =  req.body
    User.findOne({user:user},function(err,doc){
        if(doc) {
            return res.json({code:1,msg:'用户名已经被注册'})
        }
        const userModel = new User({user,pwd:getMd5(pwd)})
        userModel.save(function(err,doc){
            if(err){
                return res.json({coed:1,msg:'后端出错'})
            }
            const {user,_id} = doc
            res.cookie('userId',_id)
            return res.json({code:0,data:{user,_id}})
        })
    })
})
Router.post('/login', function (req, res) {
    console.log(req.body)
    const { user, pwd } =  req.body
    User.findOne({user:user,pwd:getMd5(pwd)},_filter,function(err,doc){
        if(!doc) {
            return res.json({code:1,msg:'用户名或密码错误'})
        }else{
            res.cookie('userId',doc. _id)
            return res.json({code:0,data:doc})
        }
    })
})
Router.post('/saveInfo', function (req, res) {
    const userId = req.cookies.userId
    if(!userId){
        return res.dumps({code:1})
    }
    console.log(userId,req.body)
    const body = req.body
    User.findByIdAndUpdate(userId,body,function(err,doc){
        console.log(doc)
        const data = Object.assign({},{
            user:doc.user,
        },body)
        return res.json({code:0,data})
    })
})
function getMd5(data){
    const salt = '9yt543jnbkjdv89==32-<?><_)#@#@#_)@#<IHWDSOIKF'
    return utlis.md5(utlis.md5(data + salt))
}

module.exports = Router