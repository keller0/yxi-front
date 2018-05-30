import axios from 'axios'

const service = axios.create({
    // baseURL: 'http://127.0.0.1/v1',
    baseURL: 'http://r.yxi.io/v1',
    timeout: 10 * 1000,
    withCredentials: false
})

service.interceptors.request.use(config => {
    config.headers['Api-Key'] = 'sharedkey'
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response.data)
    }
    return Promise.reject(response)
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误'
                break

            case 403:
                error.message = '权限不足'
                break

            case 500:
                error.message = '服务器错误'
                break

            default:
        }
    }

    if (error && error.code === 'ECONNABORTED') {
        error.message = '请求超时'
    }

    if (error && error.message === 'Network Error') {
        error.message = '网络错误'
    }

    return Promise.reject(error)
})

export default service
