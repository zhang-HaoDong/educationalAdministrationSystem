import request from "./request";

export function login(loginInfo) {
    return request({
        url: '/api/student/login',
        method: 'POST',
        data: loginInfo
    })
}

export function whoami() {
    return request({
        url: '/api/student/whoami',
        method: 'GET'
    })
}

export function updateStudent(id, info) {
    return request({
        url: `/api/student/${id}`,
        method: 'PATCH',
        data: info
    })
}

export function getTeacherById(id) {
    return request({
        url: `/api/teacher/${id}`,
        method: 'GET'
    })
}

export function getStudentById(id) {
    return request({
        url: `/api/student/${id}`,
        method: 'GET'
    })
}

export function getStudentByClassId(id) {
    return request({
        url: `/api/student/class/${id}`,
        method: 'GET'
    })
}