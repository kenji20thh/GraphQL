// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');

// Show login form, hide register form
function showLoginForm() {
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
}

// Show register form, hide login form
function showRegisterForm() {
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
}

// Event Listeners
loginLink.addEventListener('click', function(e) {
  e.preventDefault();
  showLoginForm();
});

registerLink.addEventListener('click', function(e) {
  e.preventDefault();
  showRegisterForm();
});

switchToRegister.addEventListener('click', function(e) {
  e.preventDefault();
  showRegisterForm();
});

switchToLogin.addEventListener('click', function(e) {
  e.preventDefault();
  showLoginForm();
});

// Form submission handlers
loginForm.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Here you would typically send this data to your server
  console.log('Login attempt:', { email, password });
  
  // For demo purposes, show an alert
  alert('Login form submitted! Check console for details.');
});

registerForm.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
  // Basic validation
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  // Here you would typically send this data to your server
  console.log('Registration attempt:', { name, email, password });
  
  // For demo purposes, show an alert
  alert('Registration form submitted! Check console for details.');
});