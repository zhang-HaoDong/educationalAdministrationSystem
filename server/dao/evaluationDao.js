const {Evaluation}  = require('../models')

// 添加一组评教
export async function addEvaluation(data){
    return await Evaluation.create({
        stuId:data.stuId,
        tecId:data.tecId,
        evaluation:data.evaluation
    })
}

// 获取全部评教
export async function getAllEvaluation(){
    return await Evaluation.find()
}

//分页获取评教
export async function getAllEvaluationByPage({current,pageSize}){
    return await Evaluation.find().limit(pageSize).skip((current - 1) * pageSize)
}

// 删除一组评教
export async function deleteEvaluationById(id){
    return await Evaluation.deleteOne({
        _id:id
    })
}