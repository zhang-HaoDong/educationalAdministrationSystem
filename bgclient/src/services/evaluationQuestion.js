import {request} from '@umijs/max'

export async function getAllEvaluationQuestion(){
    return request('/api/evaluationQuestion',{
        method:'GET'
    })
}

export async function deleteEvaluationQuestionById(id){
    return request(`/api/evaluationQuestion/${id}`,{
        method:'DELETE'
    })
}

export async function addEvaluationQuestion(question){
    return request('/api/evaluationQuestion',{
        method:'POST',
        data:{
            evaluationQuestion:question
        }
    })
}