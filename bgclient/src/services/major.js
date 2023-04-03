import { request } from '@umijs/max'

export async function getAllMajor() {
    return request('/api/major', {
        method: 'GET'
    })
}