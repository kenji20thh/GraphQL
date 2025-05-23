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
    
    return 

}