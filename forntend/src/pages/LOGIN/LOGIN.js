document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('username'); // Match the HTML ID
    const apartmentInput = document.getElementById('apartment');
    const fullNameInput = document.getElementById('fullName');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            // Get form values
            const email = emailInput.value;
            const apartment = apartmentInput.value;
            const fullName = fullNameInput.value;

            // Validate input
            if (!email || !apartment || !fullName) {
                alert('Please fill in all fields');
                return;
            }

            try {
                // Send login request to the backend
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, apartment, fullName }),
                })

                // Check if the response is successful
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to login');
                }

                // Login successful
                const data = await response.json();
                alert('Login successful!');
                window.location.href = '../homepage/homepage.html'; // Redirect to homepage
            } catch (error) {
                console.error('Login error:', error);
                alert(error.message || 'Login failed. Please try again.');
            }
        });
    }
});