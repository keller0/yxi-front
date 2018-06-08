import { getCodeService } from '@/utils/request'

// get public code
function getPubCode() {
    return getCodeService({
        url: 'code/pub',
        method: 'GET'
    })
}

// get populer code
function getTopCode(url) {
    return getCodeService({
        url: 'code/top',
        method: 'GET'
    })
}

export { getPubCode, getTopCode }
