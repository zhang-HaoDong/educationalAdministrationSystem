// 师生评教
const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    stuId: {
        type: String,
        required: true
    },
    tecId: {
        type: String,
        required: true
    },
    evaluation: {
        type: [{
            questionId: String,
            score: Number
        }]
    }
})

module.exports = mongoose.model('Evaluation',evaluationSchema)