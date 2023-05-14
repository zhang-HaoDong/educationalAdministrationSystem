import request from "./request";

export function addAsk(data) {
    return request({
        url: '/api/askforleave',
        method: 'POST',
        data
    })
}

export function getAskByStuId(id) {
    return request({
        url: `/api/askforleave/stu/${id}`,
        method: 'GET'
    })
}