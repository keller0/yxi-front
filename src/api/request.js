import axios from 'axios'
const RunBaseURL = 'https://r.yxi.io/v1'
const APIBaseURL = 'https://api.yxi.io/v1'

const runcodeService = axios.create({
    baseURL: RunBaseURL,
    timeout: 10 * 1000,
    withCredentials: false
})

runcodeService.interceptors.request.use(config => {
    config.headers['Api-Key'] = 'sharedkey'
    return config
}, error => {
    return Promise.reject(error)
})

runcodeService.interceptors.response.use(response => {
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

const apiService = axios.create({
    baseURL: APIBaseURL,
    timeout: 10 * 1000,
    withCredentials: false
})

apiService.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response.data)
    }
    return Promise.reject(response)
}, error => {
    return Promise.reject(error)
})

export { runcodeService, apiService }
