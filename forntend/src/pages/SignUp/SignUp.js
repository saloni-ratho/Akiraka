document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordIcon = document.getElementById('passwordIcon');
    const confirmPasswordIcon = document.getElementById('confirmPasswordIcon');
    const signInLink = document.getElementById('signIn');

    // Toggle password visibility
    passwordIcon.addEventListener('click', () => {
        togglePasswordVisibility(passwordInput, passwordIcon);
    });

    confirmPasswordIcon.addEventListener('click', () => {
        togglePasswordVisibility(confirmPasswordInput, confirmPasswordIcon);
    });

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Reset errors
        resetErrors();

        // Validate form
        if (!validateForm()) {
            return; // Stop if validation fails
        }

        // Prepare form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            apartment: document.getElementById('apartment').value,
            password: passwordInput.value,
        };

        try {
            // Send data to the backend
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if the response is successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to register user');
            }

            // Registration successful
            alert('Successfully added as a resident!');
            form.reset(); // Clear the form
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'An error occurred. Please try again.');
        }
    });

    // Handle sign-in link click
    signInLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '../LOGIN/LOGIN.html';
    });

    // Function to toggle password visibility
    function togglePasswordVisibility(input, icon) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }

    // Function to validate the form
    function validateForm() {
        let isValid = true;

        // Check if passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            isValid = false;
        }

        // Validate email format
        const email = document.getElementById('email').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('emailError').textContent = 'Invalid email format';
            isValid = false;
        }

        // Validate mobile number length
        const mobile = document.getElementById('mobile').value;
        if (mobile.length < 10 || mobile.length > 15) {
            document.getElementById('mobileError').textContent = 'Mobile number must be between 10 and 15 digits';
            isValid = false;
        }
        alert('Successfully added as a resident!');
        window.location.href = '../homepage/homepage.html'; // Redirect to homepage after successful signup
        form.reset(); // Clear the form

        return isValid;
    }

    // Function to reset error messages
    function resetErrors() {
        const errorSpans = document.querySelectorAll('.error-message');
        errorSpans.forEach((span) => (span.textContent = ''));
    }
});