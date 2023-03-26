// 评教问题
const mongoose = require('mongoose');

const evaluationQuestionSchema = new mongoose.Schema({
    evaluationQuestion: {
        question: String
    }
})

module.exports = mongoose.model('EvaluationQuestion',evaluationQuestionSchema)