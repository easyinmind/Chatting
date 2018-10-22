import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9090')

const MSG_LIST = 'MSG_LIST'
const MSG_REVE = 'MSG_REVE'
const MSG_READ = 'MSG_READ'
const LOGOUT = 'LOGOUT'

const initState = {
  chatMsg:[],
  users:{},
  unRead:0
}

export function chat(state=initState,action){
  switch (action.type) {
    case MSG_LIST:
    return {...state,users:action.payload.users,
      chatMsg: action.payload.list,
      unRead:action.payload.list.filter(v=>!v.read && action.payload.userId == v.to).length}
    case MSG_REVE:
    const count = action.payload.userId == action.payload.msg.to ? 1 : 0
    // console.log(action.payload)
    return { ...state,
      chatMsg: [...state.chatMsg, action.payload.msg],
      unRead:state.unRead + count
    }
    case LOGOUT:
    return initState
    case MSG_READ:
    const {from,num} = action.payload
      return {...state,
        chatMsg: state.chatMsg.map(v=>({...v,read:from == v.from ? true : v.read})),
        unRead:state.unRead-num}
    default:
      return state
  }
}

function chatList(list, users, userId) {
  return {type:MSG_LIST,payload:{list,users,userId}}
}
function msgRece(msg, userId) {
  return {type:MSG_REVE,payload:{msg,userId}}
}
function msgRead({userId,from,num}) {
  return {type:MSG_READ,payload:{userId,from,num}}
}
export function receMsg(){
  return (dispatch,getState) => {
    socket.on('receMsg',function(data){
      // console.log(data)
      const userId = getState().user._id
      dispatch(msgRece(data,userId))
    })
  }
}
export function sendMsg({from,to,msg}){
  return dispatch => {
    socket.emit('sendMsg',{from,to,msg})
  }
}


export function getChatList() {
  return (dispatch,getState) => {
    axios.get('/user/chatlist').then(res => {
      if(res.status == 200 && res.data.code ==0){
        const userId = getState().user._id
        dispatch(chatList(res.data.msgs, res.data.users, userId))
      }
      
    })
  }
}

export function readMsg(from) {
  return (dispatch,getState) => {
    axios.post('/user/readmsg',{from}).then(res => {
      if(res.status == 200 && res.data.code ==0){
        const userId = getState().user._id
        dispatch(msgRead({userId, from,num:res.data.num}))
      }
      
    })
  }
}