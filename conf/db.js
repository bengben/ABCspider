var mysql = require('mysql');
var pool = mysql.createPool({
  host: '116.63.144.184',
  user: 'abcdouban',
  password: 'GicKHPwKcmtzaaXG',
  database: 'abcdouban'
});

/**
 * 
 */
pool.on('connection', function (conn) {
  console.log('连接id：',conn.threadId);
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  // console.log('连接id： %d, 释放id:', connection.threadId);
});

pool.on('error',function(err){
  console.log("[mysql error]>>>>>>>>>>>>>>>>>>>>>>",err);
});

module.exports = pool;