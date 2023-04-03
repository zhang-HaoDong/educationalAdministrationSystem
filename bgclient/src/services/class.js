import { request } from '@umijs/max'

export async function getClassByMajorId(majorId) {
    return request(`/api/class/major/${majorId}`, {
        method: 'GET'
    })
}