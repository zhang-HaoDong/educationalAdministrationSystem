const { EvaluationQuestion } = require('../models')

// 添加一个评教问题
module.exports.addEvaluationQuestion = async function ({evaluationQuestion}) {
    return await EvaluationQuestion.create({
        evaluationQuestion,
    })
}

// 删除一个评教问题
module.exports.deleteEvaluationById = async function (id) {
    return await EvaluationQuestion.deleteOne({
        _id: id
    })
}

// 修改一个评教问题
module.exports.updateEvaluationQuestion = async function (id, { evaluationQuestion }) {
    return await EvaluationQuestion.updateOne({
        _id: id
    }, {
        evaluationQuestion,
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