import request from '@/utils/request'

// C 语言运行结果
export function resultC(data) {
    return request({
        url: '/c',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}
