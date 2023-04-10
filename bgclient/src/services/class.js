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

export async function deleteClassById(id) {
    return request(`/api/class/${id}`, {
        method: 'DELETE'
    })
}

export async function addClass(classInfo) {
    return request('api/class', {
        method: 'POST',
        data: classInfo
    })
}