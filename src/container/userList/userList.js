import React,{Component} from 'react'
import axios from 'axios'
import { List } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief
export default class UserList extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    this.getUserList()
  }
  getUserList(){
    axios.get('/user/list').then(res=>{
      if(res.status == 200 && res.data.code == 0){
        this.setState({
          data:res.data.data
        })
        console.log(res.data.data)
      }
    })
  }
  

  render(){
    const list = this.state.data.filter(v=>{
      return v.photo
    })
    console.log(list)
    return(
      <div>
        <List>
          {list.map(v=>(
          <Item
            key={v._id}
            thumb={<svg className="icon" aria-hidden="true"><use xlinkHref={`#icon-${v.photo}`}></use></svg>}
            multipleLine
            onClick={() => {}}
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