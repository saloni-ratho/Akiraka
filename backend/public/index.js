// Redirect to signup.html when the "Sign Up" button is clicked
document.getElementById('signUpButton').addEventListener('click', function () {
    window.location.href = "../signup/signup.html"; // Corrected relative path
});

// Redirect to login.html when the "Login" button is clicked
document.getElementById('loginButton').addEventListener('click', function () {
    window.location.href = "../login/login.html"; // Corrected relative path
});

// Fetch user data from an API (example)
fetch('/api/users') // Replace with your API endpoint
    .then(response => response.json())
    .then(usersData => {
        users = usersData; // Assign the fetched data to the 'users' variable
        console.log("User data fetched successfully:", users);
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data. Please try again later.");
    });