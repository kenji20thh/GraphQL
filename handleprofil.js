const token = localStorage.getItem('jwt')
if (!token) window.location.replace('login.html')