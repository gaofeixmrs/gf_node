window.jQuery = require('jquery');
require('bootstrap-webpack');
//import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router'
import App from './App';
import TopicDetail from './component/TopicDetail';
import Login from './component/Login';
import NewTopic from './component/NewTopic';
import EditTopic from './component/EditTopic';
import Signup from './component/Signup';
import ResetPassword from './component/ResetPassword';
import Profile from './component/Profile';
import Notification from './component/Notification';
import EmotionTag from './component/EmotionTag';

const e = document.createElement('div');
e.id = 'app';
document.body.appendChild(e);

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="topic/:id" component={TopicDetail}/>
      <Route path="topic/:id/edit" component={EditTopic}/>
      <Route path="new" component={NewTopic}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
      <Route path="reset_password" component={ResetPassword}/>
      <Route path="profile" component={Profile}/>
      <Route path="notification" component={Notification}/>
      <Route path="emotiontag" component={EmotionTag}/>
    </Route>
  </Router>
), e);
