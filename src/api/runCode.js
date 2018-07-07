import { apiService } from '@/api/request'

// 代码运行结果
export function codeRunResult(url, data) {
    return apiService({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}
