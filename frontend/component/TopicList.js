import React from 'react';
import {Link} from 'react-router';
import {getTopicList} from '../lib/client';
import '../lib/style.css';
import {formatDate} from '../lib/utils';

export default class TopicList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.updateList({
      tags: this.props.location.query.tags,
      page: this.props.location.query.page,
    });
  }

  componentWillReceiveProps(nextProps){
    this.updateList({
      tags: nextProps.location.query.tags,
      page: nextProps.location.query.page,
    });
  }

  updateList(query){
    getTopicList(query)
      .then(ret => this.setState(ret))
      .catch(err => console.error(err));
  }

  render() {
    const list = Array.isArray(this.state.list) ? this.state.list : [];
    let  page = parseInt(this.state.page, 20);
    if (!(page > 1)) page = 1;

    let prevPage = page - 1;
    if (prevPage < 1) prevPage = 1;

    let nextPage = page + 1;

    return (
      <div>
        <ul className="list-group">
          {list.map((item, i) => {
            return (
              <Link to={`/topic/${item._id}`} className="list-group-item" key={i}>

                <span className="user_avatar pull-left">
                  <img src={item.authorId.avatar || require('url!./../lib/image/avatar.jpg') }/>
                </span>

                <span className="reply_count">
                  <span className="count_of_replies" title="回复数">
                    {item.replyCount || 0}
                    &nbsp;
                  </span>
                  <span className="count_seperator">/</span>
                    &nbsp;
                  <span className="count_of_visits" title='点击数'>
                    {item.pageView || 0}
                  </span>
                </span>

                <span className="topic_title_wrapper">
                  {item.top ? <span className="label label-success" > 置顶 </span> : <span className="label label-success" > {item.tags} </span>}
                  &nbsp;&nbsp;{item.title}
                </span>

                <span className="pull-right">
                  {item.authorId.nickname} 
                  发表于 {formatDate(item.createdAt, true)}
                </span>
              </Link>
            )
          })}
        </ul>
        <nav>
          <ul className="pagination">
            <li>
              <Link to={`/?page=${prevPage}`} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            <li>
              <Link to={`/?page=${nextPage}`} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
