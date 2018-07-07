import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
export default class NavLink extends Component{

  render(){
    const list = this.props.list
    const pathname = this.props.location.pathname
    return(
      <div>
        <TabBar>
          {list.map(v=>(
            <TabBar.Item
              icon={<svg className="icon" aria-hidden="true"><use xlinkHref={v.icon}></use></svg>}
              selectedIcon={<svg className="icon" aria-hidden="true"><use xlinkHref={v.iconActive}></use></svg>}
              title= {v.text}
              key={v.path}
              selected={pathname == v.path}
              onPress={() => this.props.history.push(v.path)}
            >
            </TabBar.Item>
          ))}


        </TabBar>
      </div>
    )
  }
}