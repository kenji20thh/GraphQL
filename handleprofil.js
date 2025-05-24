let token = localStorage.getItem('jwt')
if (!token) window.location.replace('login.html')
if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1)
}

token = token.trim()
console.log('JWT Token:', token) 

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('jwt')
    window.location.replace('login.html')
})

const fetchUserData = async () => {
    try {
        const res = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                //'X-Hasura-Role': 'student'
            },
            body: JSON.stringify({
                query: `
                {
                    user {
                        id
                        login
                        email
                    }
                }
                `
            })
        })

        const result = await res.json()

        if (result.errors) {
            console.error('GraphQL Errors:', JSON.stringify(result.errors, null, 2))
            alert('Token expired or invalid. Please log in again.')
            localStorage.removeItem('jwt')
            window.location.replace('login.html')
            return
        }

        const user = result.data.user[0]
        if (!user) throw new Error('User not found')

        document.getElementById('username').textContent = user.login
        document.getElementById('email').textContent = user.email

    } catch (error) {
        console.error('Error loading profile:', error.message)
        alert('Failed loading profile data')
    }
}

fetchUserData()
