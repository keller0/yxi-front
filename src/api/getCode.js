import { apiService } from '@/api/request'

// get public code
function getCode(type) {
    return apiService({
        url: 'code?type=' + type,
        method: 'GET'
    })
}

// get ones code
function getOnesCode(userid, token) {
    return apiService({
        url: 'user/' + userid + '/code?type=all',
        method: 'GET',
        contenttype: 'text/plain',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

function getOnesPublicCode(userid) {
    return apiService({
        url: 'user/' + userid + '/code?type=public',
        method: 'GET'
    })
}

export { getCode, getOnesCode, getOnesPublicCode }
