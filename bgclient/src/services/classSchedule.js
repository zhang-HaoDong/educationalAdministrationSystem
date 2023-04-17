import { request } from '@umijs/max'

export async function getClassScheduleByClassID(classId) {
    return request(`/api/classschedule/class/${classId}`, {
        method: 'GET'
    })
}

export async function addClassSchedule(classscheduleInfo) {
    return request('/api/classschedule', {
        method: 'POST',
        data: classscheduleInfo
    })
}

export async function editClassSchedule(classId, classscheduleInfo) {
    return request(`/api/classschedule/class/${classId}`, {
        method: 'PATCH',
        data: classscheduleInfo
    })
}