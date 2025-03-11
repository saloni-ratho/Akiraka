document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const sidebar = document.getElementById('sidebar');

    // Toggle sidebar when menu is clicked
    menu.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) && !menu.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Function to handle button clicks and redirects
    function handleButtonClick(buttonId, pagePath) {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', function () {
            console.log(buttonId + ' clicked!'); // Debugging
            window.location.href = pagePath;
        });
    }

    // Call the function for each button
    handleButtonClick('visitorsButton', '../visitorsM/visitorsM.html'); // Changed path
    handleButtonClick('complaintButton', 'complaints.html');
    handleButtonClick('maintenanceButton', '../Maintenance/Maintenance.html');
    handleButtonClick('feedbackButton', 'feedback.html');
});