'use strict';

/**
@author gaofei <724291658@qq.com>
 */

module.exports = function (done) {
var tools = require('../common/tools');

  $.router.post('/api/topic/add', $.checkLogin,  async function (req, res, next) {

    req.body.authorId = req.session.user._id;

    if ('tags' in req.body) {
      req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    const topic = await $.method('topic.add').call(req.body);

    res.apiSuccess({topic});

  });


  $.router.get('/api/topic/list', async function (req, res, next) {

    if ('tags' in req.query) {
      req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    let page = parseInt(req.query.page,10);
    if (!(page > 1)) page = 1;
    req.query.limit = 10;
    req.query.skip = (page - 1) * req.query.limit;


    const list = await $.method('topic.list').call(req.query);

    const result = {};

    result.list = $.utils.cloneObject(list);

    result.list.forEach(item => {
      item.createdAt_ago = tools.formatDate(item.createdAt, true);
    });

    const count = await $.method('topic.count').call(req.query);
    const pageSize = Math.ceil(count / req.query.limit);
    result.count = count;
    result.page = page;
    result.pageSize = pageSize;

    res.apiSuccess(result);

  });


  $.router.get('/api/topic/item/:topic_id', async function (req, res, next) {

    const topic = await $.method('topic.get').call({_id: req.params.topic_id});
    if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

    const userId = req.session.user && req.session.user._id && req.session.user._id.toString();
        const isAdmin = req.session.user && req.session.user.isAdmin;

        const result = {};
        result.topic = $.utils.cloneObject(topic);

        result.topic.createdAt_ago=tools.formatDate(topic.createdAt, true);
        result.topic.permission = {
          edit: isAdmin || userId === result.topic.authorId._id,
          delete: isAdmin || userId === result.topic.authorId._id,
        };
        result.topic.comments.forEach(item => {
          item.permission = {
            delete: isAdmin || userId === item.authorId._id,
          };
          item.createdAt_ago= tools.formatDate(item.createdAt, true);
        });

        res.apiSuccess(result);


  });


  $.router.post('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {

    if ('tags' in req.body) {
      req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    req.body._id = req.params.topic_id;
    await $.method('topic.update').call(req.body);

    const topic = await $.method('topic.get').call({_id: req.params.topic_id});

    res.apiSuccess({topic});

  });


  $.router.delete('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {

    const topic = await $.method('topic.delete').call({_id: req.params.topic_id});

    res.apiSuccess({topic});

  });


  $.router.post('/api/topic/item/:topic_id/comment/add', $.checkLogin, async function (req, res, next) {

    req.body._id = req.params.topic_id;
    req.body.authorId = req.session.user._id;
    const comment = await $.method('topic.comment.add').call(req.body);

    res.apiSuccess({comment});

  });


  $.router.post('/api/topic/item/:topic_id/comment/delete', $.checkLogin, async function (req, res, next) {

    req.body._id = req.params.topic_id;

    const query = {
      _id: req.params.topic_id,
      cid: req.body.cid,
    };
    const comment = await $.method('topic.comment.get').call(query);

    if (comment && comment.comments && comment.comments[0]) {
      const item = comment.comments[0];
      if (req.session.user.isAdmin || item.author.toString() === req.session.user._id.toString()) {
        await $.method('topic.comment.delete').call(query);
      } else {
        return next(new Error('access denied'));
      }
    } else {
      return next(new Error('comment does not exists'));
    }

    res.apiSuccess({comment: comment.comments[0]});

  });


  done();

};
