// 校园通知推送
const mongoose = require('mongoose');

const NANSchema = new mongoose.Schema({
    // 封面
    cover: String,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // 发布人
    teacherId: String
}, {
    timestamps: true
})

module.exports = mongoose.model('NAN', NANSchema)