'use strict';
/**
*@author gaofei <724291658@qq.com>
**/

import mongoose from 'mongoose';

module.exports = function(done){

  const conn = mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};
  
  done();
}
