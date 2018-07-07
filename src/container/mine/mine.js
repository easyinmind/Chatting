import React,{Component} from 'react'
import { Card, WhiteSpace } from 'antd-mobile'
import {connect} from 'react-redux'
import { List } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

@connect(state=>state.user,{})
export default class Mine extends Component{

  render(){
    return(
      <div>
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
          </List>
      </div>
    )
  }
}