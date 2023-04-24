import { request } from '@umijs/max'

export async function getEvaluationByTecId(id){
    return request(`/api/evaluation/teacher/${id}`,{
        method:'GET'
    })
}