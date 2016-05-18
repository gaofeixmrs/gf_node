'use strict';
/**
*@author gaofei <724291658@qq.com>
**/

import mongoose from 'mongoose';

module.exports = function (done) {

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const User = new Schema({
    name: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    nickname: {type: String},
    about: {type: String},
    isAdmin: {type: Boolean},
    avatar:{type: String},
    score:{type: Number},
  });

  $.mongodb.model('User',User);
  $.model.User = $.mongodb.model('User');

  done();

};
