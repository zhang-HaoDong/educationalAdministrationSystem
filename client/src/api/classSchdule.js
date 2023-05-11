import request from "./request";

export function getClassSchedule(classId) {
    return request({
        url: `/api/classschedule/class/${classId}`,
        method: 'GET'
    })
}