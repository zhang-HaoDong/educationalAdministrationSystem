// 评教问题
const mongoose = require('mongoose');

const evaluationQuestionSchema = new mongoose.Schema({
    evaluationQuestion: {
        question: srting
    }
})

module.exports = mongoose.model('Evaluation',evaluationQuestionSchema)