import React, {Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import ChatList from '../chatList/chatList'
import UserList from '../userList/userList'
import Mine from '../mine/mine'
import NavLink from '../../component/navLink/navLink'

export default class Main extends Component{

  render(){
    const navList = [
      {
        title:'最近联系',
        text:'消息',
        icon: '#icon-weixin-copy',
        iconActive:'#icon-weixin',
        path:'/chatlist',
        component:ChatList
      },
      {
        title:'用户列表',
        text:'用户',
        icon: '#icon-tongxunlu1',
        iconActive: '#icon-tongxunlu',
        path:'/userlist',
        component:UserList
      },
      {
        title:'个人中心',
        text:'我的',
        icon: '#icon-gerenzhongxin',
        iconActive: '#icon-gerenzhongxin1',
        path:'/mine',
        component:Mine
      }
    ]
    const pathname = this.props.location.pathname
    return(
      <div>
        <div className="navBar">
          <NavBar>{navList.find(v=>v.path==pathname).title}</NavBar>
        </div>
        
        <div className="main">
          <Switch>{
            navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}/>
            ))
          }
        </Switch>
        </div>
        <div className="tabBar">
        <NavLink list={navList}></NavLink>
        </div>

      </div>
    )
  }
}