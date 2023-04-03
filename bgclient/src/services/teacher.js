import { request } from '@umijs/max'

// 根据id查找老师
export async function getTeacherById(id) {
    return request(`/api/teacher/${id}`, {
        method: 'GET'
    })
}

// 获取所有老师的数据
export async function getAllTeacher() {
    return request('/api/teacher', {
        method: 'GET'
    })
}