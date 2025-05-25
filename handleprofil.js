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


let profileData = {}
let audits = []

const notificationCountEl = document.getElementById('notification-count')
const auditListEl = document.getElementById('audit-list')
const notificationEl = document.getElementById('notification')

notificationEl.addEventListener('click', () => {
    if (auditListEl.style.display == 'block') {
        auditListEl.style.display = 'none'
    }
    else {
        auditListEl.style.display = 'block'
        if (audits.length) {
            auditListEl.innerHTML = audits.map(a => `<div>${a.title}</div>`).join('')
        } else {
            notificationCountEl.style.display = 'none'
            auditListEl.style.display = 'none'
            notificationEl.style.display = 'none'
        }
    }
})
notificationCountEl.innerHTML = audits.length

const moduleButtons = document.querySelectorAll('#button-row button')
moduleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        moduleButtons.forEach((b) => {
            b.classList.remove = 'selected'
        })
        btn.classList.add = 'selected'
        // to add logic after
    })
} )

const fetchUserData = async () => {
    try {
        const res = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `
                query {
                    user {
                        id
                        login
                        email
                        transactions(where: {type: {_eq: "xp"}}) {
                            amount
                            createdAt
                            object {
                                name
                                type
                            }
                        }
                        progresses {
                            grade
                            createdAt
                            object {
                                id
                                name
                                type
                            }
                        }
                        results {
                            grade
                            createdAt
                            object {
                                id
                                name
                                type
                            }
                        }
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
        console.log(user)
        if (!user) throw new Error('User not found')
        document.getElementById('username').textContent = user.login
        document.getElementById('email').textContent = user.email
        profileData = user
        console.log("Fetched Full Profile Data:", profileData)
    } catch (error) {
        console.error('Error loading profile:', error.message)
        alert('Failed loading profile data')
    }
}

fetchUserData()
