import { runcodeService } from '@/api/request'

// 代码运行结果
export function codeRunResult(url, data) {
    return runcodeService({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}
