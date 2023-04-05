// 班级
const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    },
    majorId: String,
    counselorId: String
})

module.exports = mongoose.model('Class', ClassSchema)