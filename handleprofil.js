const token = localStorage.getItem('jwt')
if (!token) window.location.replace('login.html')

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('jwt')
    window.location.replace('login.html')
})

const query = `{{
  user {
    id
  }
}}`

const fetchUserData = async () => {
    try {
        const res = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        })
        if (!res.ok) throw new Error('failed at fetching user data')

        const result = await res.json()
        console.log(result)
        const user = result.data.user[0]
        if (!user) throw new Error('user not found')
        document.getElementById('username').textContent = user.login
        document.getElementById('email').textContent = user.email
    } catch (error) {
        console.error('error loading profile', error.message)
    alert('OKKKK')
    }

}

fetchUserData()