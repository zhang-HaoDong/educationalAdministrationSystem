const { EvaluationQuestion } = require('../models')

// 添加一个评教问题
export async function addEvaluationQuestion(data) {
    return await EvaluationQuestion.create({
        evaluationQuestion: data.question
    })
}

// 删除一个评教问题
export async function deleteEvaluationById(id) {
    return await EvaluationQuestion.deleteOne({
        _id: id
    })
}

// 修改一个评教问题
export async function updateEvaluationQuestion(id, { question }) {
    return await EvaluationQuestion.updateOne({
        _id: id
    }, {
        evaluationQuestion: question,
    })
}

// 获取所有评教问题
export async function getAllEvaluation() {
    return await EvaluationQuestion.find()
}

//根据id获取评教问题
export async function getEvaluationQuestionById(id){
    return await EvaluationQuestion.findById(id)
}