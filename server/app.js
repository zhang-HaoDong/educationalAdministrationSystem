var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {getError} = require('./utils/getSendResult')
require('dotenv').config()
require('express-async-errors')
// 链接数据库
require('./db/index')


var app = express();


app.use(logger('dev'));
// 解析json格式的消息体
app.use(express.json());
// 一次性获取body中的资源 而不需要我们使用流的方式
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 做静态资源访问的
app.use(express.static(path.join(__dirname, 'public')));

// 使用路由
app.use('/askForLeave', require('./routes/askForLeave'));
app.use('/class',require('./routes/class'))
app.use('/classschedule',require('./routes/classSchedule'));
app.use('/course',require('./routes/course'))
// error handler
app.use(function (err, req, res, next) {
  if (err) {
    res.status(406)
    res.send(getError(err.message,406))
  } else {
    next()
  }

});

module.exports = app;
