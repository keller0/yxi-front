import { getCodeService } from '@/utils/request'

// get public code
function getCode(type) {
    return getCodeService({
        url: 'code?type=' + type,
        method: 'GET'
    })
}

// get ones code
function getOnesCode(userid, token) {
    return getCodeService({
        url: 'user/' + userid + '/code?type=all',
        method: 'GET',
        contenttype: 'text/plain',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

function getOnesPublicCode(userid) {
    return getCodeService({
        url: 'user/' + userid + '/code?type=public',
        method: 'GET'
    })
}

export { getCode, getOnesCode, getOnesPublicCode }
