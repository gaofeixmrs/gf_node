'use strict';
/**
*@author gaofei <724291658@qq.com>
**/
require("babel-polyfill");

import validator from 'validator';

module.exports = function (done) {


  $.method('notification.add').check({
    from: {required: true, validate: (v) => validator.isMongoId(String(v))},
    to: {required: true, validate: (v) => validator.isMongoId(String(v))},
    type: {required: true, validate: (v) => typeof v==='string' && v},
  });
  $.method('notification.add').register(async function (params) {

    const item = new $.model.Notification(params);
    item.createAt = new Date();
    item.isRead = false;

    return item.save();
  });


  $.method('notification.list').check({
    from: {validate: (v) => validator.isMongoId(String(v))},
    to: {validate: (v) => validator.isMongoId(String(v))},
    type: {validate: (v) => typeof v==='string' && v},
    skip: {validate: (v) => v >= 0},
    limit: {validate: (v) => v > 0},
  });
  $.method('notification.list').register(async function (params) {

    const query = {};
    if (params.from) query.from = params.from;
    if (params.to) query.to = params.to;
    if (params.type) query.type = params.type;
    if ('isRead' in params) query.isRead = params.isRead;

    const ret = $.model.Notification.find(query)
    .populate({
      path: 'from',
      model: 'User',
      select: 'nickname about avatar',
    }).populate({
      path: 'to',
      model: 'User',
      select: 'nickname about avatar',
    });
    if (params.skip) ret.skip(Number(params.skip));
    if (params.limit) ret.limit(Number(params.limit));
    ret.sort({_id: -1});
    return ret;

  });


  $.method('notification.count').check({
    from: {validate: (v) => validator.isMongoId(String(v))},
    to: {validate: (v) => validator.isMongoId(String(v))},
    type: {validate: (v) => typeof v==='string' && v},
  });
  $.method('notification.count').register(async function (params) {

    const query = {};
    if (params.from) query.from = params.from;
    if (params.to) query.to = params.to;
    if (params.type) query.type = params.type;
    if ('isRead' in params) query.isRead = params.isRead;

    return $.model.Notification.count(query);

  });


  $.method('notification.setRead').check({
    _id: {required: true, validate: (v) => validator.isMongoId(String(v))},
    to: {required: true, validate: (v) => validator.isMongoId(String(v))},
  });
  $.method('notification.setRead').register(async function (params) {

    return $.model.Notification.update(params, {$set: {
      isRead:true,
      readAt: new Date(),
    }});

  });


  $.method('notification.delete').check({
    _id: {required: true, validate: (v) => validator.isMongoId(String(v))},
    to: {required: true, validate: (v) => validator.isMongoId(String(v))},
  });
  $.method('notification.delete').register(async function (params) {

    return $.model.Notification.remove(params);

  });

  done();

};
