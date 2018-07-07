import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveInfo} from '../../redux/user.redux'
import { WingBlank, WhiteSpace, Radio, Grid, List, InputItem, TextareaItem, Button } from 'antd-mobile'
import '../../iconfont'

const RadioItem = Radio.RadioItem
@connect(
  state=>state.user,
  {saveInfo}
)
export default class UserInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      photo: 'dongwu',
      name:'',
      age:'',
      gender:'girl',
      mood:'',
      desc:''
    }
    this.saveInfo = this.saveInfo.bind(this)
  }

  saveInfo(){
    const {photo,name,age,gender,mood,desc} = this.state
    this.props.saveInfo({photo,name,age,gender,mood,desc})
  }

  changePhoto(elm){
    console.log(elm)
    this.setState({
      photo: elm.name
    })
  }
  changeInput(v,type){
    this.setState({
      [type]:v
    })
  }

  render(){
    const data = [
      'dongwu',
      'dongwudiaocha',
      'animal',
      'dongwu1',
      'icon-',
      'icon-test',
      'icon-test1',
      'icon-test2',
      'icon-test3',
      'icon-test4',
      'icon-test5',
      'icon-test6',
      'icon-test7',
      'dongwuyuan',
      'user__easyico',
      'touxiangnvhai',
      'dongwuxue',
      'dongwu2',
      'dongwu3',
      'dongwuyuan3',
      'dongwu4',
      'dongwu5',
      'dongwutubiao-shangse-huli',
      'dongwutubiao-shangse-mao',
      'dongwutubiao-shangse-mifeng',
      'dongwutubiao-shangse-houzi',
      'dongwutubiao-xianxing-mao',
      'dongwutubiao-xianxing-niu',
      'dongwutubiao-shangse-zhu',
      'gerenzhongxin1'
    ].map((v,i)=>{
      return {
        icon: <svg className="icon" aria-hidden="true"><use xlinkHref={`#icon-${v}`}></use></svg> ,
        text: ``,
        name:v
      }
    })
    const pathname = this.props.location.pathname
    const pathTo = this.props.redirectTo
    return(
      <div>
        {
          pathTo && pathTo != pathname ? <Redirect to={this.props.redirectTo}></Redirect> : null
        }
        <WingBlank className='userPhoto'>
          <span>已选择头像：</span>
          <span>
            <svg className="icon" aria-hidden="true"><use xlinkHref={`#icon-${this.state.photo}`}></use></svg>
          </span>
        </WingBlank>
        <Grid onClick={elm => this.changePhoto(elm)} data={data} columnNum={6} activeStyle={false} />
        <WhiteSpace />
        <List>
          <WhiteSpace />
          <InputItem onChange={v => this.changeInput(v,'name')}>姓名</InputItem>
          <WhiteSpace />
          <InputItem type='number' onChange={v => this.changeInput(v,'age')}>年龄</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.gender=='boy'} onChange={(v) => this.changeInput('boy','gender')}>
            男
          </RadioItem>
          <RadioItem checked={this.state.gender=='girl'} onChange={(v) => this.changeInput('girl','gender')}>
            女
          </RadioItem>
          <WhiteSpace />
          <TextareaItem 
            title="心情"
            placeholder="发表心情" 
            rows={2}
            autoHeight
            onChange={v => this.changeInput(v,'mood')}></TextareaItem>
            <WhiteSpace />
          <TextareaItem            
            title="简介"
            placeholder="填写简介" 
            rows={2}
            autoHeight
            onChange={v => this.changeInput(v,'desc')}></TextareaItem>
            <WhiteSpace />
            <Button onClick={this.saveInfo} type="primary">primary</Button>
            <WhiteSpace size='xl' />
        </List>
      </div>
    )
  }
}