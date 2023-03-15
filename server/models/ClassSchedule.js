// 课表
const mongoose = require('mongoose');

const classScheduleSchema = new mongoose.Schema({
    courses:{
        type:Object,
        required:true
    }
})
module.exports = mongoose.model('ClassSchedule',classScheduleSchema)