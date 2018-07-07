import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import {InputItem, 
  WhiteSpace,
  WingBlank,
  List,
  Button
  }
  from 'antd-mobile'
import Logo from '../../component/logo/logo'

@connect(
  state=>state.user,
  {login}
)
export default class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:''
    }
    this.goRegister = this.goRegister.bind(this)
    this.loginBtn = this.loginBtn.bind(this)
  }

  goRegister() {
    this.props.history.push('/register')
  }
  changeInput(v,type){
    this.setState({
      [type]:v
    })
  }
  loginBtn(){
    this.props.login(this.state.user,this.state.pwd)
  }
  render(){

    return(
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          {this.props.msg}
          <List>
            <InputItem onChange={v => this.changeInput(v,'user')}>用户名</InputItem>
            <InputItem onChange={v => this.changeInput(v,'pwd')}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.loginBtn} type='primary'>登录</Button>
          <WhiteSpace />
          <Button onClick={this.goRegister}>注册新用户</Button>
        </WingBlank>
      </div>
    )
  }
}