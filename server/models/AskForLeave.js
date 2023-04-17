// 请销假
const mongoose = require('mongoose')

const askForLeaveSchema = new mongoose.Schema({
    stuId: {
        type: String,
        required: true
    },
    tecId: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    // 请假类型
    typeOfLeave: {
        type: String,
        required: true
    },
    destination: String,
    // 紧急联系人
    emergencyContact: {
        type: String,
        required: true
    },
    // 紧急联系人电话
    emergencyTel: {
        type: String,
        required: true
    },
    begin: {
        // 时间戳
        type: String,
        required: true
    },
    end: {
        // 时间戳
        type: String,
        required: true
    },
    //请假事由
    reason: {
        type: String,
        required: true
    },
    // 附件 图片的上传
    attachment: String,
    // 是否批准
    isPass: {
        type: String,
        default: 'pending'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('AskForLeave', askForLeaveSchema)