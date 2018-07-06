import axios from 'axios'

const APIBaseURL = 'https://api.yxi.io/v1'
// const APIBaseURL = 'http://localhost:8090/v1'

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

export { apiService }
