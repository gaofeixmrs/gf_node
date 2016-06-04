import React from 'react';
import jQuery from 'jquery';
import {loginUser, updateProfile} from '../lib/client';
import {redirectURL} from '../lib/utils';
import {Link} from 'react-router';
import '../lib/style.css';

export default class EmotionTag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    loginUser()
      .then(user => this.setState(user))
      .catch(err => console.error(err));
  }

  handleChange(name, e) {
    this.setState({[name]: e.target.value});
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail" title="兴奋" >
              <img src={require('url!./../lib/image/emotag/9.5兴奋.png')}/>
              <span className="badge">&nbsp;&nbsp;兴 奋&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/8.5惊喜.png')}/>
              <span className="badge">&nbsp;&nbsp;惊 喜&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/7.5开心.png')}/>
              <span className="badge">&nbsp;&nbsp;开 心&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/6.5窃喜.png')}/>
              <span className="badge">&nbsp;&nbsp;窃 喜&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/5.5害羞.png')}/>
              <span className="badge">&nbsp;&nbsp;害 羞&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/4.5紧张.png')}/>
              <span className="badge">&nbsp;&nbsp;紧 张&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/3.5纠结.png')}/>
              <span className="badge">&nbsp;&nbsp;纠 结&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/2.5尴尬.png')}/>
              <span className="badge">&nbsp;&nbsp;尴 尬&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/1.5无奈.png')}/>
              <span className="badge">&nbsp;&nbsp;无 奈&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/0.5郁闷.png')}/>
              <span className="badge">&nbsp;&nbsp;郁 闷&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-0.5后悔.png')}/>
              <span className="badge">&nbsp;&nbsp;后 悔&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-1.5失落.png')}/>
              <span className="badge">&nbsp;&nbsp;失 落&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-2.5委屈.png')}/>
              <span className="badge">&nbsp;&nbsp;委 屈&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-3.5气愤.png')}/>
              <span className="badge">&nbsp;&nbsp;气 愤&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-4.5烦躁.png')}/>
              <span className="badge">&nbsp;&nbsp;烦 躁&nbsp;&nbsp;</span>
           </Link>
        </div>

        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-5.5恼火.png')}/>
              <span className="badge">&nbsp;&nbsp;恼 火&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-6.5忧愁.png')}/>
              <span className="badge">&nbsp;&nbsp;忧 愁&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-7.5害怕.png')}/>
              <span className="badge">&nbsp;&nbsp;害 怕&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-8.5伤心.png')}/>
              <span className="badge">&nbsp;&nbsp;伤 心&nbsp;&nbsp;</span>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-9.5痛苦.png')}/>
              <span className="badge">&nbsp;&nbsp;痛 苦&nbsp;&nbsp;</span>
           </Link>
        </div>


      </div>
    )
  }
}
