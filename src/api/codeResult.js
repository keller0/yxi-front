import request from '@/utils/request'

// 代码运行结果
export function codeRunResult(url, data) {
    return request({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}
