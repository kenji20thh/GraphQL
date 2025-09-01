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
    icon.textContent = 'expand_less';
  } else {
    content.classList.remove('expanded');
    text.textContent = 'Show Details';
    icon.classList.remove('rotated');
    icon.textContent = 'expand_more';
  }
}

// Authentication and token handling
let token = localStorage.getItem('jwt')

if (!token) window.location.replace('login.html')

if (token.startsWith('"') && token.endsWith('"')) {
  token = token.slice(1, -1)
}

token = token.trim()

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('jwt')
  window.location.replace('login.html')
})

// Global variables
const usernameDisplay = document.getElementById('username-display')
let profileData = {}
let audits = []

// Fetch user data from GraphQL API
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
      login
      firstName
      lastName
      email
      campus
      auditRatio
      totalUp
      totalDown
      transactions(
        where: {
          _and: [
            { type: { _eq: "level" } },
            { eventId: { _eq: 41 } }
          ]
        }
        order_by: { amount: desc }
        limit: 1
      ) {
        amount
      }
      xps(
        where: { originEventId: { _eq: 41 } }
        order_by: { amount: asc }
      ) {
        path
        amount
      }
    }
    totalXp: transaction_aggregate(
      where: {
        type: { _eq: "xp" },
        eventId: { _eq: 41 }
      }
    ) {
      aggregate {
        sum {
          amount
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
    document.getElementById('full-name').textContent = (user.firstName || 'User') + ' ' + (user.lastName || '')
    document.getElementById('username-display').textContent = user.login
    document.getElementById('username-display-card').textContent = user.login
    document.getElementById('first-name').textContent = user.firstName || 'N/A'
    document.getElementById('last-name').textContent = user.lastName || 'N/A'
    document.getElementById('email').textContent = user.email
    document.getElementById('audit-ratio').textContent = user.auditRatio ? user.auditRatio.toFixed(2) : 'N/A'
    profileData = user

    // const auditRatio = user.auditRatio ?? 0;
    // document.getElementById('audit-ratio').textContent = `Audit Ratio: ${auditRatio.toFixed(2)}`;

    // const xpSum = user.transactions_aggregate.aggregate.sum.amount || 0
    // const xpInKb = (xpSum / 1000).toFixed(1)
    // document.getElementById('total-xp').textContent = `XP: ${xpInKb} kB`

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

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
  fetchUserData();
});

