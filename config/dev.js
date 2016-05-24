
module.exports = function(set,get,has){

  set('web.port',3001);
  set('db.mongodb','mongodb://192.168.99.100:32768/gf_node');

  set('smtp.host','smtp.qq.com');
  set('smtp.secure',true);
  set('smtp.port',465);
  set('smtp.auth.user','724291658@qq.com');
  set('smtp.auth.pass','abicagqnfuuhbdbd');

  set('github.clientID','d0d819507134b36fc966');
  set('github.clientSecret','15cc139debea14d2fe7df85f0cc4c8465f1b9618');
  set('github.callbackURL','http://127.0.0.1:3000/auth/github');
};
