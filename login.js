document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('hexContainer');
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    // Hexagon dimensions (smaller hexagons)
    const hexWidth = 30;
    const hexHeight = 26; // Total height including the pseudo-elements

    // Spacing between hexagons
    const horizontalSpacing = hexWidth * 0.9; // Slightly less than width for a tighter pattern
    const verticalSpacing = hexHeight * 0.75; // Adjusted for proper vertical spacing

    // Calculate number of hexagons needed
    const columns = Math.ceil(containerWidth / horizontalSpacing) + 1;
    const rows = Math.ceil(containerHeight / verticalSpacing) + 1;

    // Create hexagons
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const hexagon = document.createElement('div');
            hexagon.className = 'hexagon';

            // Position hexagons in a grid pattern with proper spacing
            // Offset every other row for the honeycomb pattern
            const xPos = col * horizontalSpacing + (row % 2 ? horizontalSpacing / 2 : 0);
            const yPos = row * verticalSpacing;

            hexagon.style.left = `${xPos}px`;
            hexagon.style.top = `${yPos}px`;

            container.appendChild(hexagon);
        }
    }

    // Add hover effect to hexagons
    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Only get hexagons near the mouse for better performance
        const hexagons = document.querySelectorAll('.hexagon');

        hexagons.forEach(hexagon => {
            const rect = hexagon.getBoundingClientRect();
            const hexCenterX = rect.left + rect.width / 2;
            const hexCenterY = rect.top + rect.height / 2;

            // Calculate distance from mouse to hexagon center
            const distance = Math.sqrt(
                Math.pow(mouseX - hexCenterX, 2) +
                Math.pow(mouseY - hexCenterY, 2)
            );

            // Activate hexagons within a certain radius (smaller radius for smaller hexagons)
            if (distance < 50) {
                hexagon.classList.add('active');

                // Deactivate after a delay for trailing effect
                setTimeout(() => {
                    hexagon.classList.remove('active');
                }, 600);
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        // Clear existing hexagons
        container.innerHTML = '';

        // Recalculate and redraw
        const newContainerWidth = window.innerWidth;
        const newContainerHeight = window.innerHeight;

        const newColumns = Math.ceil(newContainerWidth / horizontalSpacing) + 1;
        const newRows = Math.ceil(newContainerHeight / verticalSpacing) + 1;

        for (let row = 0; row < newRows; row++) {
            for (let col = 0; col < newColumns; col++) {
                const hexagon = document.createElement('div');
                hexagon.className = 'hexagon';

                const xPos = col * horizontalSpacing + (row % 2 ? horizontalSpacing / 2 : 0);
                const yPos = row * verticalSpacing;

                hexagon.style.left = `${xPos}px`;
                hexagon.style.top = `${yPos}px`;

                container.appendChild(hexagon);
            }
        }
    });

    // Basic form validation
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        // Here you would typically send the form data to a server
        console.log('Login attempt:', { username, password });
        alert('Login successful! (This is just a demo)');
    });

    // Add some random initial active hexagons for visual interest
    const hexagons = document.querySelectorAll('.hexagon');
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * hexagons.length);
        hexagons[randomIndex].classList.add('active');

        setTimeout(() => {
            hexagons[randomIndex].classList.remove('active');
        }, 2000);
    }
});


// login handling

let loginForm = document.getElementById('login-form')

const handleLogin = (event) => {
    event.preventDefault()
    const usernameInput = document.getElementById('username')
    const passwordInput = document.getElementById('password')
    console.log('Username:', username);
    console.log('Password:', password);
}
loginForm.addEventListener('submit', handleLogin);


async function loginUser(username, password) {
    const credentials = btoa(`${username}:${password}`); // Base64 encode
    const url = 'https://((DOMAIN))/api/auth/signin'; // Replace with your actual domain
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      const token = data.token; // JWT
  
      localStorage.setItem('jwt', token); // Save token for later requests
  
      // Redirect to profile page or do whatever you want next
      window.location.href = 'profile.html';
    } catch (error) {
      alert(error.message);
    }
  }
  