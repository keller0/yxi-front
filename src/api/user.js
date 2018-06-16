import { apiService } from '@/api/request'
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
