const {
    addEvaluation,
    deleteEvaluationById,
    getAllEvaluation,
    getAllEvaluationByPage,
    getEvaluationByStudentId,
    getEvaluationByTeacherId,
    getEvaluationById
} = require('../dao/evaluationDao')

// 新增评教
module.exports.addEvaluationService = async function(data){
    return await addEvaluation(data);
}

// 删除评教
module.exports.deleteEvaluationByIdService = async function(id){
    return await deleteEvaluationById(id)
}

// 查询所有评教
module.exports.getAllEvaluationService = async function(){
    return await getAllEvaluation()
}

// 分页获取评教
module.exports.getAllEvaluationByPageService = async function(pageInfo){
    return await getAllEvaluationByPage(pageInfo)
}

// 根据学生id获取评教
module.exports.getEvaluationByStudentIdService = async function(stuId){
    return await getEvaluationByStudentId(stuId)
}

// 根据教师id获取评教
module.exports.getEvaluationByTeacherIdService = async function(teacherId){
    return await getEvaluationByTeacherId(teacherId)
}

// 根据id获取评级哦啊
module.exports.getEvaluationByIdService = async function(id){
    return await getEvaluationById(id)
}