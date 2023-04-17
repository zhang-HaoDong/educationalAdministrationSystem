// 课表
const mongoose = require('mongoose');

const classScheduleSchema = new mongoose.Schema({
    courses: {
        type: Array,
        required: true,
        default:[
            [
                '',
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六',
                '周日',
            ],
            [
                '第一节(8:00 - 10:00)',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
            ],
            [
                '第二节(10:00 - 12:00)',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
            ],
            [
                '第三节(14:00 - 16:00)',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
            ],
            [
                '第四节(16:00 - 18:00)',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
            ],
            [
                '第五节(19:00 - 21:00)',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
            ],
        ]
    },
    // 班级id
    classId: String
})
module.exports = mongoose.model('ClassSchedule', classScheduleSchema)