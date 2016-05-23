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
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/8.5惊喜.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/7.5开心.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/6.5窃喜.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/5.5害羞.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/4.5紧张.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/3.5纠结.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/2.5尴尬.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/1.5无奈.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/0.5郁闷.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-0.5后悔.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-1.5失落.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-2.5委屈.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-3.5气愤.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-4.5烦躁.png')}/>
           </Link>
        </div>

        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-5.5恼火.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-6.5忧愁.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-7.5害怕.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-8.5伤心.png')}/>
           </Link>
        </div>
        <div className="col-xs-6 col-md-1">
           <Link to="#" className="thumbnail">
              <img src={require('url!./../lib/image/emotag/-9.5痛苦.png')}/>
           </Link>
        </div>


      </div>
    )
  }
}
