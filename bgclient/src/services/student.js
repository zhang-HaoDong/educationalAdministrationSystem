import { request } from '@umijs/max'

// 分页获取学生信息
export async function getStudentByPage(params) {
    return request('/api/student', {
        method: 'GET',
        params: params
    })
}

// 更改学生的信息
export async function updateStudent(id, stuInfo) {
    return request(`/api/student/${id}`, {
        method: 'PATCH',
        data: stuInfo
    })
}

// 删除学生
export async function deleteStudent(id) {
    return request(`/api/student/${id}`, {
        method: 'DELETE'
    })
}

// 判断学生是否存在
export async function isExist(stuInfo) {
    return request('/api/student/isexist', {
        method: 'POST',
        data: stuInfo
    })
}

// 添加一个学生
export async function addStudent(stuInfo) {
    return request('/api/student/register', {
        method: 'POST',
        data: stuInfo
    })
}

// 根据id获取学生信息
export async function getStudentById(id) {
    return request(`/api/student/${id}`, {
        method: 'GET'
    })
}