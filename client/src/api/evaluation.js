import request from "./request"

export function getAllAskQuestion() {
    return request({
        url: '/api/evaluationQuestion'
    })
}

export function addEvaluation(data) {
    return request({
        url: '/api/evaluation',
        method: 'POST',
        data
    })
}