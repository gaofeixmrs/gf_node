'use strict';

/**
*@author gaofei <724291658@qq.com>
 */


import nodemailer from 'nodemailer';

module.exports = function (done) {


  $.smtp = nodemailer.createTransport($.config.get('smtp'), {
    from: $.config.get('smtp.auth.user'),
  });


  $.method('mail.send').check({
    to: {required: true},
    subject: {required: true},
    html: {required: true},
  });
  $.method('mail.send').register(function (params, callback) {

    $.smtp.sendMail(params, callback);

  });

$.method('mail.send').call({
  to: 'gao_fei@cepiec.com.cn',
  subject: 'gf_node测试邮件',
  html:'test',
},console.log);


  done();

};
