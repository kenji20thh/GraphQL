const handleLoginFormSubmit = (event) => {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if (!username || !password) {
        alert('enter credentials')
        return null
    }

    const credentials = {username, password}
    return credentials
}

const isValidCredentials = (credentials) => {

    const {username, password} = credentials
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