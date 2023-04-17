import { request } from '@umijs/max'

export async function getCourseByMajorId(majorID) {
    return request(`/api/course/${majorID}`, {
        method: 'GET'
    })
}

export async function deleteCourseById(id) {
    return request(`/api/course/${id}`, {
        method: "DELETE"
    })
}

export async function addCourse(courseInfo) {
    return request(`/api/course`, {
        method: "POST",
        data: courseInfo
    })
}