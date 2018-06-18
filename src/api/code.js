import { apiService } from '@/api/request'

// get public code
function getCodeList(type) {
    return apiService({
        url: 'code?type=' + type,
        method: 'GET'
    })
}

// get ones code
function getOnesCodeList(userid, token) {
    return apiService({
        url: 'user/' + userid + '/code?type=all',
        method: 'GET',
        contenttype: 'text/plain',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

function getOnesPublicCodeList(userid) {
    return apiService({
        url: 'user/' + userid + '/code?type=public',
        method: 'GET'
    })
}

function getCode(codeid, part, token) {
    return apiService({
        url: 'code/' + codeid + part,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

function createCode(data, token) {
    return apiService({
        url: 'code',
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data
    })
}

function updateCode(data, token) {
    return apiService({
        url: 'code',
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data
    })
}

function likeCode(codeid, token) {
    return apiService({
        url: 'likes/' + codeid,
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export { getCodeList, getOnesCodeList, getOnesPublicCodeList, getCode, createCode, likeCode, updateCode }
