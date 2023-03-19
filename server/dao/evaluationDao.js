// 引入评教模型
const {Evaluation}  = require('../models');

// 获取全部的评教数据
export function getAllEvaluation(){
    return Evaluation.find();
}

// 根据教师id获取评教数据
export function getEvaluationByTeacherId(tID){
    return Evaluation.find({
        tecId:tID
    })
}

// 根据学生id获取评教数据
export function getEvaluationByStudentId(sID){
    return Evaluation.find({
        stuId:sID
    })
}

// 删除id获取删除评教数据
export function deleteEvaluationById(id){
    return Evaluation.deleteOne({
        _id:id
    })
}

// 添加一条评教数据
export function addEvaluation(evaluationInfo){
    return Evaluation.create({
        ...evaluationInfo
    })
}