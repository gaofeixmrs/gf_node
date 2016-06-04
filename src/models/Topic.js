'use strict';

/**
*@author gaofei <724291658@qq.com>
 */

import mongoose from 'mongoose';

module.exports = function (done) {

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const Topic = new Schema({
    authorId: {type: ObjectId, index: true},
    title: {type: String, trim: true},
    content: {type: String},
    tags: [{type: String, index: true}],
    top: { type: Boolean, default: false }, // 置顶帖
    good: {type: Boolean, default: false}, // 精华帖
    createdAt: {type: Date, index: true},
    updatedAt: {type: Date, index: true},
    lastCommentedAt: {type: Date, index: true},
    comments: [{
      authorId: ObjectId,
      content: String,
      createdAt: Date,
    }],
    pageView: {type: Number},
    replyCount: {type: Number, default: 0},
  });

  $.mongodb.model('Topic', Topic);
  $.model.Topic = $.mongodb.model('Topic');

  done();

};
