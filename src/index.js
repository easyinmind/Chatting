import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom'
import thunk from 'redux-thunk'
import reducers from './reducers'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRouter from './component/authRouter/aurhRouter'
import UserInfo from './container/userInfo/userInfo'
import Main from './container/main/main'
import Chat from './container/chat/chat'
import './config'
import './index.css'
const store = createStore(reducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))


ReactDOM.render(
  
  ( <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRouter></AuthRouter>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/userInfo' component={UserInfo}/>
            <Route path='/chat/:userId' component={Chat}/>
            
            <Route component={Main}/>

          </Switch>

          
        </div>
      </BrowserRouter>

  </Provider>),
  
  document.getElementById('root'))
