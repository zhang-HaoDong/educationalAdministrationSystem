const { Evaluation } = require('../models')

// 添加一组评教
module.exports.addEvaluation = async function (data) {
    return await Evaluation.create({
        stuId: data.stuId,
        tecId: data.tecId,
        evaluation: data.evaluation
    })
}

// 获取全部评教
module.exports.getAllEvaluation = async function () {
    return await Evaluation.find()
}

//分页获取评教
module.exports.getAllEvaluationByPage = async function ({ current, pageSize }) {
    return await Evaluation.find().limit(pageSize).skip((current - 1) * pageSize)
}

// 删除一组评教
module.exports.deleteEvaluationById = async function (id) {
    return await Evaluation.deleteOne({
        _id: id
    })
}

// 根据学生id获取评教
module.exports.getEvaluationByStudentId = async function (stuId) {
    return Evaluation.find({
        stuId: stuId
    })
}

// 根据教师id获取评教
module.exports.getEvaluationByTeacherId = async function (tecId) {
    return await Evaluation.find({
        tecId: tecId
    })
}