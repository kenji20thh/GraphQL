const handleLoginFormSubmit = (event) => {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if (!username || !password) {
        alert('enter credentials')
        return null
    }

    const credentials = { username, password }
    return credentials
}

const isValidCredentials = (credentials) => {
    const { username, password } = credentials
    if (!username || !password) {
        alert('enter credentials')
        return false
    }
    const onlyAlpha = /^[A-Za-z]+$/.test(username)
    if (!onlyAlpha) {
        alert('username must only be alphabetic')
        return false
    }
    return true
}

const encodeCredentials = (credentials) => {
    const { username, password } = credentials
    const concat = username + ':' + password
    const encodedCredentials = btoa(concat)
    return encodedCredentials

}

const fetchJWTToken = async (encodedCredentials) => {
    const endPoint = 'https://((DOMAIN))/api/auth/signin'
    try {
        const res = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`
            }
        })
        if (!res.ok) {
            throw new Error('Invalid credentials')
        }
        const data = await res.json()
        const token = data.token
        localStorage.setItem('jwt', token)
        return {
            success: true,
            token: token
        }
    } catch (error) {
        console.error('signin failed', error.message)
        return {
            success: false,
            error: error.message
        }
    }
}