import request from './request'

export function login(username, password) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: { username, password }
    })
}

export function logout() {
    return request({
        url: '/auth/logout',
        method: 'post'
    })
}

export function getProfile() {
    return request({
        url: '/auth/profile',
        method: 'get'
    })
}