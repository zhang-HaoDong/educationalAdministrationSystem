// 学生信息
const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    loginId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 6,
        maxLength: 18
    },
    loginPwd: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        trim: true,
        maxLength: 12
    },
    sex: String,
    tel: {
        type: String,
        trim: true,
    },
    mail: {
        type: String,
        trim: true,
        validate: {
            validator: function (mail) {
                return /.+@.+\.com/.test(mail);
            },
            message: props => `${props.value} is not a valid mail address!`
        },
    },
    avatar: String,
    wechat: {
        type: String,
        trim: true
    },
    intro: String,
    enabled: {
        type: Boolean,
        required: true
    },
    // 辅导员Id
    counselorId: {
        type: String,
        required: true
    },
    // 专业id
    majorId: String,
    // 班级Id
    classId: {
        type: String,
        required: true
    },
    scores: {
        type: [{
            sbjId: String,
            sbjScore: Number
        }]
    },
});

// 通过mongoose定义模型并导出 第一个参数代表数据库中集合的名称 第二个代表结构
module.exports = mongoose.model('Students', studentSchema)