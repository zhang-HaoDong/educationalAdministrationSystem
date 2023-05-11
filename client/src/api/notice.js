import request from './request'

export function getNoticeByPage() {
    return request({
        url: '/api/NAN'
    })
}

export function getNoticeById(id) {
    return request({
        url: `/api/NAN/${id}`
    })
}