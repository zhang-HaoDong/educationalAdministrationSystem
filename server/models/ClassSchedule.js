// 课表
const mongoose = require('mongoose');

const classScheduleSchema = new mongoose.Schema({
    courses: {
        type: Object,
        required: true
    },
    // 班级id
    classId: String
})
module.exports = mongoose.model('ClassSchedule', classScheduleSchema)