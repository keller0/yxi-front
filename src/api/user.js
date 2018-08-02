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

function userRegister(email, name) {
    return apiService({
        url: 'user',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: email,
            user: name
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
// update password use email and token
function registerComplete(email, pass, token, user) {
    return apiService({
        url: 'account/complete',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: email,
            pass: pass,
            token: token,
            user: user
        }
    })
}
export { userLogin,
    userRegister,
    registerComplete,
    resetPassEmail,
    resetPass
}
