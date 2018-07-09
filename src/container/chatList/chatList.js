import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
  state=>state,
  {}
)
export default class ChatList extends Component{
  getlast(arr){
    return arr[arr.length-1]
  }
  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const users = this.props.chat.users
    const userId = this.props.user._id 
    console.log(this.props.chat.chatMsg)
    const msgGroup = {}
    this.props.chat.chatMsg.forEach(v => {
      // console.log(v.chatId)
      // console.log(v)
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      // console.log(msgGroup[v.chatId])
      msgGroup[v.chatId].push(v)
    })
    // const chatList = Object.values(msgGroup)
    let chatList = Object.keys(msgGroup).map(function (key) {
      return msgGroup[key]
      // return key
    })
    chatList.sort((a, b) => {
      const a_last = this.getlast(a).create_time
      const b_last = this.getlast(b).create_time
      console.log(a_last, b_last)
      return b_last - a_last
    })
    console.log(chatList)
    if (!userId) {
      console.log(123)
      return null
    }
    console.log(321)
    return(
      <div>
        <List>

          {
            chatList.map(v=>{
              console.log(userId===v[0].from)
              // console.log(v[0])
              const lastItem = this.getlast(v)
              const targetId = v[0].from == userId ? v[0].to : v[0].from
              const badge = v.filter(v=>!v.read&&userId==v.to).length
              console.log(users[targetId], targetId)
              if (!users[targetId] || !userId) {
                return null
              }
              return(
              <Item 
                extra={<Badge text={badge}></Badge>}
                thumb={<svg className="icon" aria-hidden="true"><use xlinkHref={`#icon-${users[targetId].photo}`}></use></svg>}
                key={lastItem._id}>
                {users[targetId].name}
                <Brief>{lastItem.content}</Brief>
              </Item>
            )})
          }

        </List>
      </div>
    )
  }
}