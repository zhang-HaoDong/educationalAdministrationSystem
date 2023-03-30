// 学科
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    majorId: String
})
module.exports = mongoose.model('Course', courseSchema);