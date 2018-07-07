import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadInfo } from '../../redux/user.redux'
@withRouter
@connect(
  state=>state,
  {loadInfo}
)
export default class AuthRouter extends Component{
  componentDidMount() {
    const pubList = ['/login','/register']
    if(pubList.indexOf(this.props.location.pathname) != -1){
      return null
    }
    axios.get('/user/info').then(res=>{
      console.log(res.data)
      if(res.data.code == 0){
        this.props.loadInfo(res.data.data)
        console.log(this.props)
      }else{
        this.props.history.push('/login')
      }
    })
  }
  render(){
    return null
  }
}