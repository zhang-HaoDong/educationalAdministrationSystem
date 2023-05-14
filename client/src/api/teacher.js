import request from "./request";

export function getTeacherByStuId(id) {
    return request({
        url: `/api/teacher/${id}`,
        method: 'GET'
    })
}