'use strict';

/**
*@author gaofei <724291658@qq.com>
 */

import validator from 'validator';


module.exports = function (done) {


  $.method('topic.add').check({
    authorId: {required: true, validate: (v) => validator.isMongoId(v)},
    title: {required: true},
    content: {required: true},
    tags: {validate: (v) => Array.isArray(v)},
  });
  $.method('topic.add').register(async function (params) {

    const topic = new $.model.Topic(params);
    topic.createdAt = new Date();

    return topic.save();

  });


  $.method('topic.get').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
  });
  $.method('topic.get').register(async function (params) {

    return $.model.Topic.findOne({_id: params._id})
    .populate({
      path: 'authorId',
      model: 'User',
      select: 'nickname about',
  }).populate({
      path: 'comments.authorId',
      model: 'User',
      select: 'nickname about',
    });
  });


  $.method('topic.list').check({
    authorId: {validate: (v) => validator.isMongoId(v)},
    tags: {validate: (v) => Array.isArray(v)},
    skip: {validate: (v) => v >= 0},
    limit: {validate: (v) => v > 0},
  });
  $.method('topic.list').register(async function (params) {

    const query = {};
    if (params.authorId) query.authorId = params.authorId;
    if (params.tags) query.tags = {$all: params.tags};

    const ret = $.model.Topic.find(query, {
      authorId: 1,
      title: 1,
      tags: 1,
      createdAt: 1,
      updatedAt: 1,
      lastCommentedAt: 1,
      replyCount: 1,
      top:1,
      good:1,
      pageView: 1,
    }).populate({
      path: 'authorId',
      model: 'User',
      select: 'nickname about avatar',
    });
    if (params.skip) ret.skip(Number(params.skip));
    if (params.limit) ret.limit(Number(params.limit));
    ret.sort({top: -1,good: -1, _id: -1});
    return ret;

  });


  $.method('topic.count').check({
    authorId: {validate: (v) => validator.isMongoId(v)},
    tags: {validate: (v) => Array.isArray(v)},
  });
  $.method('topic.count').register(async function (params) {

    const query = {};
    if (params.authorId) query.authorId = params.authorId;
    if (params.tags) query.tags = {$all: params.tags};

    return $.model.Topic.count(query);

  });

  $.method('topic.delete').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
  });
  $.method('topic.delete').register(async function (params) {

    return $.model.Topic.remove({_id: params._id});

  });


  $.method('topic.update').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
    tags: {validate: (v) => Array.isArray(v)},
  });
  $.method('topic.update').register(async function (params) {


    const update = {updatedAt: new Date()};
    if (params.title) update.title = params.title;
    if (params.content) update.content = params.content;
    if (params.tags) update.tags = params.tags;

    return $.model.Topic.update({_id: params._id}, {$set: update});

  });

  $.method('topic.incrPageView').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
  });

  $.method('topic.incrPageView').register(async function (params) {

    return $.model.Topic.update({_id: params._id}, {$inc: {pageView: 1}});

  });


  $.method('topic.incrreplay').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
  });

  $.method('topic.incrreplay').register(async function (params) {

    return $.model.Topic.update({_id: params._id}, {$inc: {replyCount: 1}});

  });



  $.method('topic.dincrreplay').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
  });

  $.method('topic.dincrreplay').register(async function (params) {

    return $.model.Topic.update({_id: params._id}, {$inc: {replyCount: -1}});

  });


  $.method('topic.top').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
  });

  $.method('topic.top').register(async function (params) {

    return $.model.Topic.update({_id: params._id}, {top: 1});

  });


  $.method('topic.good').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
  });

  $.method('topic.good').register(async function (params) {

    return $.model.Topic.update({_id: params._id}, {good: 1});

  });



  $.method('topic.comment.add').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
    authorId: {required: true, validate: (v) => validator.isMongoId(v)},
    content: {required: true},
  });
  $.method('topic.comment.add').register(async function (params) {

    const comment = {
      authorId: params.authorId,
      content: params.content,
      createdAt: new Date(),
    };

    const topic = await $.method('topic.get').call({_id: params._id});
    if (!topic) throw new Error('topic does not exists');
// console.log({
//   from: params.authorId,
//   to: topic.authorId._id,
//   type:'topic_commit',
//   date:{
//     _id: params._id,
//   },
// });
    await $.method('notification.add').call({
      from: params.authorId,
      to: topic.authorId._id,
      type:'topic_commit',
      data:{
        _id: params._id,
        title: topic.title,
      }
    });

    const fromUser = await $.method('user.get').call({_id: params.authorId});
    const toUser = await $.method('user.get').call({_id: topic.authorId._id});
    // $.method('mail.sendTemplate').call({
    //   to: toUser.email,
    //   subject: `有人回复了你发表的主题《${topic.title}》`,
    //   template: 'reply',
    //   data: {
    //     topic: topic,
    //     content: params.content,
    //     user: fromUser,
    //   },
    // }, err => {
    //   if (err) console.error(err);
    // });
   //db.getCollection('topics').update({_id:ObjectId("5750fb70d3c47be304fc04ec")},{ $inc: { reply_count: 1}})
    return $.model.Topic.update({_id: params._id}, {
      $push: {
        comments: comment
      },
    });
  });


  $.method('topic.comment.get').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
    cid: {required: true, validate: (v) => validator.isMongoId(v)},
  });
  $.method('topic.comment.get').register(async function (params) {

    return $.model.Topic.findOne({
      _id: params._id,
      'comments._id': params.cid
    }, {
      'comments.$': 1,
    }).populate({
      path: 'authorId',
      model: 'User',
      select: 'nickname about',
    });

  });


  $.method('topic.comment.delete').check({
    _id: {required: true, validate: (v) => validator.isMongoId(v)},
    cid: {required: true, validate: (v) => validator.isMongoId(v)},
  });
  $.method('topic.comment.delete').register(async function (params) {

    return $.model.Topic.update({_id: params._id}, {
      $pull: {
        comments: {
          _id: params.cid,
        }
      }
    });

  });


  done();

};
