import axios from 'axios'

const GET_USERLIST = 'GET_USERLIST'
const initState = {
  list:[]
}
export function userList(state = initState,action) {
  switch (action.type) {
    case GET_USERLIST:
      return {...state,list:action.payload}
    default:
      return state
  }
}

function getUserlist(list){
  return {type:GET_USERLIST,payload:list}
}

export function axiosUserList(){
  return dispatch => {
    axios.get('/user/list').then(res=>{
      if(res.status == 200 && res.data.code == 0){
         dispatch(getUserlist(res.data.data))
      }
    })
  }
}