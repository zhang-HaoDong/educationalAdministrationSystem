// 专业
const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
    marjorName: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Major', majorSchema);