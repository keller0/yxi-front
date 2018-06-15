import axios from 'axios'

const apiService = axios.create({
    // baseURL: 'http://127.0.0.1:8090/v1',
    baseURL: 'https://api.yxi.io/v1',
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

function userLogin(name, pass) {
    return apiService({
        url: 'login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            user: name,
            password: pass
        }
    })
}

function userRegister(email, name, pass) {
    return apiService({
        url: 'user',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: email,
            user: name,
            password: pass
        }
    })
}
export { userLogin, userRegister }
