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

// 删除教师
export async function deleteTeacher(id) {
    return request(`/api/teacher/${id}`, {
        method: 'DELETE'
    })
}

// 判断老师是否存在
export async function isExist(teacherInfo) {
    return request('/api/teacher/isexist', {
        method: 'POST',
        data: teacherInfo
    })
}

// 添加一个教师
export async function addTeacher(teacherInfo) {
    return request('/api/teacher/register', {
        method: 'POST',
        data: teacherInfo
    })
}

// 修改教师信息
export async function updateTeacher(id, teacherInfo) {
    return request(`/api/teacher${id}`, {
        method: 'PATCH',
        data: teacherInfo
    })
}