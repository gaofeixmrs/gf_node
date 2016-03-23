'use strict';
/**
*@author gaofei <724291658@qq.com>
**/

module.exports = function (done) {

 $.router.get('/',function (req, res, next) {
   res.end(`现在是北京时间${new Date()}`);
 });
 
 done();
 
};
