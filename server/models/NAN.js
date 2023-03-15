// 校园通知推送
const mongoose = require('mongoose');

const NANSchema = new mongoose.Schema({
    // 封面
    cover:String,
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('NAN',NANSchema)