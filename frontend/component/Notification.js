import React from 'react';
import jQuery from 'jquery';
import {Link} from 'react-router';
import 'highlight.js/styles/github-gist.css';
import {notificationList,notificationSetRead} from '../lib/client';
import {redirectURL,formatDate} from '../lib/utils';

export default class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.refresh();
  }

  refresh(){
    notificationList()
      .then(ret => this.setState(ret))
      .catch(err => console.error(err));
  }

  handleSetRead(id,e) {
    const $btn = jQuery(e.target);
    $btn.button('loading');
    notificationSetRead(id)
      .then(ret => {
        $btn.button('reset');
        this.refresh();
      })
      .catch(err => {
        $btn.button('reset');
        alert(err);
      });
  }

  render() {
    if (!Array.isArray(this.state.list)) {
      return (
        <p>正在加载...</p>
      )
    }
    const list = this.state.list.map(item => {
      const ret = {};
      if (item.type === 'topic_commit') {
        ret.link = `/topic/${item.data._id}`;
        ret.title = `${item.from.nickname}于${formatDate(item.createAt, true)}评论了你发布的主题《${item.data.title}》`;
      } else {
        ret.Link = null;
        ret.title = `系统消息`;
      }
      ret._id = item._id;
      ret.createAt = item.createAt;
      ret.isRead = item.isRead;
      ret.readAt = item.readAt;
      return ret;
    });
    return (
      <ul className="list-group">
        {list.map((item, i) => {
          return (
            <li className="list-group-item" key={i}>
              <Link to={item.link} >
                {item.title}
              </Link>
                {!item.isRead ?
                  <span className="pull-right">
                    <button className="btn btn-xs btn-success" onClick={this.handleSetRead.bind(this,item._id)}><i className="glyphicon glyphicon-ok"></i> 设置为已读</button>
                  </span>
                  : null}
            </li>
          )
        })}
        </ul>
    )
  }
}
