import { request } from '@umijs/max'

export async function getClassByMajorId(majorId) {
    return request(`/api/class/major/${majorId}`, {
        method: 'GET'
    })
}

export async function getClassById(id) {
    return request(`/api/class/${id}`, {
        method: 'GET'
    })
}