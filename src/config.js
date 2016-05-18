 'use strcit';

module.exports = function(set,get,has){

  set('web.port',3000);

  // session secret
  set('web.session.secret','test');

  // session redis connection
  set('web.session.redis', {
    host: '127.0.0.1',
    port: 6379,
  });

  // limter redis connection
  set('limiter.redis', {
    host: '127.0.0.1',
    port: 6379,
    prefix: 'L:',
  });

};
