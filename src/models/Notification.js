'use strict';

/**
*@author gaofei <724291658@qq.com>
 */

import mongoose from 'mongoose';

module.exports = function (done) {

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const Notification = new Schema({
    from: {type: ObjectId, index: true},
    to: {type: ObjectId, index: true},
    type: {type: String},
    data: {type: Object},
    createAt: {type: Date},
    isRead: {type: Boolean},
    readAt: {type: Date},

  });

  $.mongodb.model('Notification', Notification);
  $.model.Notification = $.mongodb.model('Notification');

  done();

};
