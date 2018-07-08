import React,{Component} from 'react'
import { connect } from 'react-redux'
import {InputItem,NavBar,List,Icon} from 'antd-mobile'
import {getChatList,sendMsg,receMsg} from '../../redux/chat.redux'
import {getChatId} from '../../utils'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9090')
@connect(
  state => state, 
  {getChatList,sendMsg,receMsg}
)
export default class Chat extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      msgList:[]
    }
    this.handleText = this.handleText.bind(this)
  }
  componentDidMount() {
    if (this.props.chat.chatMsg.length == 0) {
      this.props.getChatList()
      this.props.receMsg()
    }
  }
  handleText(){
    // socket.emit('sendMsg',{msg:this.state.text})
    
    const from = this.props.user._id
    const to = this.props.match.params.userId
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
  }

  render(){
    const Item = List.Item
    const userId = this.props.match.params.userId
    const users = this.props.chat.users
    console.log(userId)
    if(!users[userId]) {
      return null
    }
    const chatId = getChatId(userId,this.props.user._id)
    const chatList = this.props.chat.chatMsg.filter(v => chatId === v.chatId)
    return (
      <div className='chat'>
        <div className='Header'>
          <NavBar
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.goBack()}>
            {users[userId].name}
          </NavBar>
        </div>
        <div className='msgList'>
          {
            chatList.map(v => {
              const photo = <svg className="icon" aria-hidden="true"><use xlinkHref={`#icon-${users[v.from].photo}`}></use></svg>
              return(
              userId !== v.from ? (
                <List key={v._id}>
                  <Item className='chatMe' extra={photo}>
                    {v.content}
                  </Item>
                </List>
              ):(
                <List key={v._id}>
                  <Item
                  thumb={photo}>
                    {v.content}
                  </Item>
                </List>
              )
          )})}
        </div>
        <div className='footer'>
          <InputItem 
            value={this.state.text}
            onChange={v=>this.setState({text:v})}
            extra={<span onClick={this.handleText}>发送</span>}
          >
          </InputItem>
        </div>
        
      </div>
    )
  }
}