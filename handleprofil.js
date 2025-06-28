let isExpanded = false;

function toggleExpand() {
    const content = document.getElementById('expandableContent');
    const btn = document.getElementById('expandBtn');
    const text = document.getElementById('expandText');
    const icon = document.getElementById('expandIcon');

    isExpanded = !isExpanded;

    if (isExpanded) {
        content.classList.add('expanded');
        text.textContent = 'Hide Details';
        icon.classList.add('rotated');
    } else {
        content.classList.remove('expanded');
        text.textContent = 'Show Details';
        icon.classList.remove('rotated');
    }
}

// Your existing functionality
let token = localStorage.getItem('jwt')

if (!token) window.location.replace('login.html')

if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1)
}

token = token.trim()

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('jwt')
    window.location.replace('login.html')
})

const usernameDisplay = document.getElementById('username-display')
let profileData = {}
let audits = []

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
                    firstName
                    lastName
                    auditRatio
                    transactions(where: { type: { _eq: "xp" } }) {
                      amount
                      createdAt
                      object {
                        name
                        type
                      }
                    }
                    transactions_aggregate(
                      where: {
                        type: { _eq: "xp" }
                      }
                    ) {
                      aggregate {
                        sum {
                          amount
                        }
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
        if (!user) throw new Error('User not found')

        // Update all the display elements
        // document.getElementById('profile-image').textContent = "https://discord.zone01oujda.ma//assets/pictures/" + login + ".jpg"
        document.getElementById('full-name').textContent = (user.firstName || 'User') + ' ' + (user.lastName || '')
        document.getElementById('username-display').textContent = user.login
        document.getElementById('username-display-card').textContent = user.login
        document.getElementById('first-name').textContent = user.firstName || 'N/A'
        document.getElementById('last-name').textContent = user.lastName || 'N/A'
        document.getElementById('email').textContent = user.email

        const profileImageUrl = "https://discord.zone01oujda.ma/assets/pictures/" + user.login + ".jpg"
        const profileRoot = document.getElementById("profile-root")
        profileRoot.innerHTML = ''

        // Create and insert the image inside the profile image container
        const profileImageContainer = document.createElement('div')
        profileImageContainer.className = 'profile-image'

        const img = document.createElement('img')
        img.src = profileImageUrl
        img.alt = user.login

        profileImageContainer.appendChild(img)
        profileRoot.appendChild(profileImageContainer)

        profileData = user

        const auditRatio = user.auditRatio
        document.getElementById('audit-ratio').textContent = `Audit Ratio: ${auditRatio.toFixed(2)}`

        const xpSum = user.transactions_aggregate.aggregate.sum.amount || 0
        const xpInKb = (xpSum / 1000).toFixed(1)
        document.getElementById('total-xp').textContent = `XP: ${xpInKb} kB`

    } catch (error) {
        console.error('Error loading profile:', error.message)
        alert('Failed loading profile data')
    }
}

// Add keyboard support for accessibility
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
        if (event.target.classList.contains('expand-btn')) {
            event.preventDefault();
            toggleExpand();
        }
    }
});

// Load user data when page loads
fetchUserData()