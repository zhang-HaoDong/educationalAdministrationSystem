// 教师信息
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
        required: true,
        default: true
    },
    permission: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Teacher', teacherSchema)