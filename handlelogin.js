const encodeCredentials = (username, password) => {
    const credentials = `${username}:${password}`
    return btoa(credentials)
}
