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
function resetPassEmail(email) {
    return apiService({
        url: 'account/password/email',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: email
        }
    })
}
// update password use email and token
function resetPass(email, pass, token) {
    return apiService({
        url: 'account/password',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: email,
            pass: pass,
            token: token
        }
    })
}
export { userLogin,
    userRegister,
    resetPassEmail,
    resetPass
}
