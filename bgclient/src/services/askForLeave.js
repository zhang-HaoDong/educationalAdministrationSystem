import { request } from '@umijs/max'

export async function getAskForLeave(isPass, pageInfo) {
    return request('/api/askForLeave', {
        method: 'GET',
        params: {
            ...pageInfo,
            isPass,
        }
    })
}

export async function deleteAskForLeave(id) {
    return request(`/api/askForLeave/${id}`, {
        method: 'DELETE'
    })
}

export async function updateAskForLeave(id, info) {
    return request(`/api/askForLeave/${id}`, {
        method: 'PATCH',
        data: info
    })
}