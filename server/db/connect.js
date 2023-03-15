var mongoose = require('mongoose');

// 禁用警告
mongoose.set('strictQuery', true);

// 连接数据库
mongoose.connect('mongodb://localhost/educationalAdministrationSystemServer');

// 获取mongoose连接实例对象
var db = mongoose.connection;
// 连接失败处理
db.on('error', console.error.bind(console, 'connection error:'));
// 连接成功处理
db.once('open', function () {
    // we're connected!
    console.log('数据库连接成功')
});