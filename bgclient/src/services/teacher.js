import { request } from '@umijs/max'

// 根据id查找老师
export async function getTeacherById(id) {
    return await request(`/api/teacher/${id}`, {
        method: 'GET'
    })
}