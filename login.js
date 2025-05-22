document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('hexContainer');
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  
  // Hexagon dimensions
  const hexWidth = 100;
  const hexHeight = 86.6; // Approximate total height of hexagon
  
  // Calculate number of hexagons needed
  const columns = Math.ceil(containerWidth / (hexWidth * 0.75)) + 1;
  const rows = Math.ceil(containerHeight / hexHeight) + 1;
  
  // Create hexagons
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
          const hexagon = document.createElement('div');
          hexagon.className = 'hexagon';
          
          // Position hexagons in a grid pattern
          // Offset every other row
          const xPos = col * (hexWidth * 0.75);
          const yPos = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);
          
          hexagon.style.left = `${xPos}px`;
          hexagon.style.top = `${yPos}px`;
          
          container.appendChild(hexagon);
      }
  }
  
  // Add hover effect to hexagons
  document.addEventListener('mousemove', function(e) {
      const hexagons = document.querySelectorAll('.hexagon');
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      hexagons.forEach(hexagon => {
          const rect = hexagon.getBoundingClientRect();
          const hexCenterX = rect.left + rect.width / 2;
          const hexCenterY = rect.top + rect.height / 2;
          
          // Calculate distance from mouse to hexagon center
          const distance = Math.sqrt(
              Math.pow(mouseX - hexCenterX, 2) + 
              Math.pow(mouseY - hexCenterY, 2)
          );
          
          // Activate hexagons within a certain radius
          if (distance < 150) {
              hexagon.classList.add('active');
              
              // Deactivate after a delay for trailing effect
              setTimeout(() => {
                  hexagon.classList.remove('active');
              }, 1000);
          }
      });
  });
  
  // Basic form validation
  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', function(e) {
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
});