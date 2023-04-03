// 专业
const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
    majorName: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Major', majorSchema);