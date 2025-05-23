const token = localStorage.getItem('jwt')
if (!token) window.location.replace('login.html')

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('jwt')
    window.location.replace('login.html')
})

