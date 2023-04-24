// 评教问题
const mongoose = require('mongoose');

const evaluationQuestionSchema = new mongoose.Schema({
    evaluationQuestion: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('EvaluationQuestion', evaluationQuestionSchema)