import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {axiosUserList} from '../../redux/userList.redux'
import { List } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief
@connect(
  state=>state.userList,
  {axiosUserList}
)
export default class UserList extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    if(!this.props.list.length){
      this.props.axiosUserList()
    }
  }


  render(){
    const list = this.props.list.filter(v=>{
      return v.photo
    })
    return(
      <div>
        <List>
          {list.map(v=>(
          <Item
            key={v._id}
            thumb={<svg className="icon" aria-hidden="true"><use xlinkHref={`#icon-${v.photo}`}></use></svg>}
            multipleLine
            onClick={() => {
              this.props.history.push(`/chat/${v._id}`)
            }}
          >
            {v.name || '暂无昵称'} 
            <Brief>心情：{v.mood}</Brief>
          </Item>
          ))}
        </List>
      </div>
    )
  }
}