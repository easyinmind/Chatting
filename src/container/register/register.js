import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {register} from '../../redux/user.redux'
import {InputItem,
  WhiteSpace,
  WingBlank,
  List,
  Button
  }from 'antd-mobile'
import Logo from '../../component/logo/logo'
@connect(
  state=>state.user,
  {register}
)
export default class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:''
    }
    this.goLogin = this.goLogin.bind(this)
    this.registerBtn = this.registerBtn.bind(this)
  }

  goLogin() {
    this.props.history.push('/login')
  }
  changeInput(e,type){
    this.setState({
      [type]:e
    })
  }
  registerBtn(){
    const {user,pwd,repeatpwd} = this.state
    this.props.register(user,pwd,repeatpwd)
  }
  render(){

    return(
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          {this.props.msg}
          <List>
            <InputItem onChange={e => this.changeInput(e,'user')}>用户名</InputItem>
            <InputItem onChange={e => this.changeInput(e,'pwd')}>密码</InputItem>
            <InputItem onChange={e => this.changeInput(e,'repeatpwd')}>确认密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.registerBtn} type='primary'>注册</Button>
          <WhiteSpace />
          <Button onClick={this.goLogin}>去登陆</Button>
        </WingBlank>
      </div>
    )
  }
}