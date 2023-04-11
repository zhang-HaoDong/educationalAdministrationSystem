import { request } from '@umijs/max'

export async function addNews(newsInfo) {
    return request('/api/NAN', {
        method: 'POST',
        data: newsInfo
    })
}

export async function getNews() {
    return request('/api/NAN', {
        method: 'GET'
    })
}

export async function deleteNews(id) {
    return request(`/api/NAN/${id}`, {
        method: 'DELETE'
    })
}

export async function getNewsById(id) {
    return request(`/api/NAN/${id}`, {
        method: 'GET'
    })
}

export async function updateNewsById(id, newsInfo) {
    return request(`/api/NAN/${id}`, {
        method: 'PATCH',
        data: newsInfo
    })
}