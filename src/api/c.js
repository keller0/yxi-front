import request from '@/utils/request'

// C 语言运行结果
export function getResultC(data) {
    return request({
        url: '/c',
        method: 'POST',
        data
    })
}
