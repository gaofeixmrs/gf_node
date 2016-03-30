'use strict';
/**
*@author gaofei <724291658@qq.com>
**/

import mongoose from 'mongoose';

module.exports = function(done){

  const debug = $.createDebug('init:momgodb');
  debug('initing momgodb...');

  const conn = mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};

  const ObjectId = mongoose.Types.ObjectId;
  $.utils.ObjectId = ObjectId;

  done();
}
