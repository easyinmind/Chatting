import React,{Component} from 'react'
import { Card, WhiteSpace, Button,List } from 'antd-mobile'
import {connect} from 'react-redux'
import browserCokies from 'browser-cookies'
import {logout} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

const Item = List.Item
const Brief = Item.Brief

@connect(state=>state.user,{logout})
export default class Mine extends Component{
  constructor(props){
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout(){
    browserCokies.erase('userId')
    this.props.logout()
    console.log('logout')
  }
  render(){
    return(
      <div>
        {
          this.props.user ? 
          (<div>
          <Card full>
            <Card.Header
              title={this.props.name || '暂无昵称'}
              thumb={<svg className="icon" aria-hidden="true"><use xlinkHref={`#icon-${this.props.photo}`}></use></svg>}
              // extra={<span>{this.props.age}岁/{this.props.gender}</span>}
            />
          </Card>
            <List>
              <Item multipleLine wrap
              extra={this.props.age}>
                年龄
              </Item>
              <Item multipleLine wrap extra={this.props.gender == 'boy' ? '男' : '女'}>
                性别
              </Item>
              <Item multipleLine wrap>
                心情
                <Brief>{this.props.mood}</Brief>
              </Item>
              <Item multipleLine wrap>
                简介
                <Brief>{this.props.desc}</Brief>
              </Item>
              <WhiteSpace size='xl' />
              <Button onClick={this.logout} type="primary">注销登陆</Button>
            </List>
          </div>)
          : <Redirect to={this.props.redirectTo} />
        }

      </div>
    )
  }
}