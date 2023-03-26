const { EvaluationQuestion } = require('../models')

// 添加一个评教问题
module.exports.addEvaluationQuestion = async function (data) {
    return await EvaluationQuestion.create({
        evaluationQuestion: data.question
    })
}

// 删除一个评教问题
module.exports.deleteEvaluationById = async function (id) {
    return await EvaluationQuestion.deleteOne({
        _id: id
    })
}

// 修改一个评教问题
module.exports.updateEvaluationQuestion = async function (id, { question }) {
    return await EvaluationQuestion.updateOne({
        _id: id
    }, {
        evaluationQuestion: question,
    })
}

// 获取所有评教问题
module.exports.getAllEvaluation = async function () {
    return await EvaluationQuestion.find()
}

//根据id获取评教问题
module.exports.getEvaluationQuestionById = async function (id) {
    return await EvaluationQuestion.findById(id)
}