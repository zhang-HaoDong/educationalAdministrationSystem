import { request } from '@umijs/max'

export async function getAllMajor() {
    return request('/api/major', {
        method: 'GET'
    })
}

export async function addMajor(data){
    return request('/api/major',{
        method:'POST',
        data
    })
}

export async function deleteMajor(id){
    return request(`/api/major/${id}`,{
        method:'DELETE'
    })
}