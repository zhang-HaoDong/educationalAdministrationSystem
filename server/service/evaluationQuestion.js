const {addEvaluationQuestion,deleteEvaluationById,getAllEvaluation,getEvaluationQuestionById,updateEvaluationQuestion} = require('../dao/evaluationQuestionDao');

// 新增一个问题
module.exports.addEvaluationQuestionService = async function(data){
    return await addEvaluationQuestion(data)
}

// 删除一个问题
module.exports.deleteEvaluationByIdService = async function(id){
    return await deleteEvaluationById(id)
}

// 获取所有评教问题
module.exports.getAllEvaluationService = async function(){
    return await getAllEvaluation()
}

// 根据id获取评教问题
module.exports.getEvaluationQuestionByIdService = async function(id){
    return await getEvaluationQuestionById(id)
}

// 修改评教问题
module.exports.updateEvaluationQuestionService  = async function(id,data){
    return updateEvaluationQuestion(id,data)
}