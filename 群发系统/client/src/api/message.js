import request from './request'

export function getMessages() {
    return request({
        url: '/messages',
        method: 'get'
    })
}

export function createMessage(data) {
    return request({
        url: '/messages',
        method: 'post',
        data
    })
}

export function updateMessage(id, data) {
    return request({
        url: `/messages/${id}`,
        method: 'put',
        data
    })
}

export function deleteMessage(id) {
    return request({
        url: `/messages/${id}`,
        method: 'delete'
    })
}

export function publishMessage(id) {
    return request({
        url: `/messages/${id}/publish`,
        method: 'post'
    })
}

export function getRecords(params) {
    return request({
        url: '/messages/records',
        method: 'get',
        params
    })
}