import axios from 'axios'
import {getPath} from '../utils'
const ERROR_MSG = 'ERROR_MSG'
const SAVE_INFO = 'SAVE_INFO'
const LOAD_INFO = 'LOAD_INFO'
const LOGOUT = 'LOGOUT'
const initState = {
  redirectTo:'',
  user:'',
  msg:''
}

export function user(state=initState,action){
  switch (action.type) {
    case SAVE_INFO:
      return {...state,msg:'',redirectTo:getPath(action.payload),...action.payload}
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.msg} 
    case LOAD_INFO:
      return {...state,...action.payload}
    case LOGOUT:
    return {...initState,redirectTo:'/login'}
    default:
      return state
  }
}
function errorMsg(msg){
  return {msg,type:ERROR_MSG}
}
function saveInfoSuccess(data){
  return {payload:data,type:SAVE_INFO}
}
export function loadInfo(info) {
  return {payload:info,type:LOAD_INFO}
}
export function logout(info) {
  return {type:LOGOUT}
}
export function register(user,pwd,repeatpwd){
  if(!user || !pwd){
    return errorMsg('用户名密码不能为空')
  }
  if (pwd != repeatpwd) {
    return errorMsg('两次密码不一致')
  }
  return dispatch => {
    axios.post('/user/register',{user,pwd}).then(res => {
      if(res.status == 200 && res.data.code == 0){
        dispatch(saveInfoSuccess(res.data.data))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
export function login(user,pwd){
  if(!user || !pwd){
    return errorMsg('用户名密码不能为空')
  }
  return dispatch => {
    axios.post('/user/login',{user,pwd}).then(res => {
      if(res.status == 200 && res.data.code == 0){
        dispatch(saveInfoSuccess(res.data.data))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function saveInfo(opt){
  return dispatch => {
    axios.post('/user/saveInfo', opt).then(res => {
      if(res.status == 200 && res.data.code == 0){
        dispatch(saveInfoSuccess(res.data.data))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

