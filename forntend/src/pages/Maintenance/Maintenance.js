document.addEventListener('DOMContentLoaded', () => {
    loadMaintenanceData(); // Load existing data from the backend when the page loads
});

function addData() {
    const apartmentNumber = document.getElementById('apartmentNumber').value;
    const paymentStatus = document.getElementById('paymentStatus').value;
    const paymentDate = document.getElementById('paymentDate').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const pastBillPaid = document.getElementById('pastBillPaid').value;

    // Validate input
    if (!apartmentNumber || !paymentStatus || !paymentDate || !paymentAmount || !paymentMethod || !pastBillPaid) {
        alert('Please fill out all fields.');
        return;
    }

    // Create maintenance data object
    const maintenanceData = {
        apartmentNumber,
        paymentStatus,
        paymentDate,
        paymentAmount,
        paymentMethod,
        pastBillPaid,
    };

    // Send data to the backend
    fetch('http://localhost:5000/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceData),
    })
    .then((response) => {
        if (!response.ok) throw new Error('Failed to add maintenance data');
        return response.json();
    })
    .then((data) => {
        alert('Maintenance data added successfully!');
        addRowToTable(data); // Add the new row to the table
        clearForm(); // Clear the form
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add maintenance data. Please try again.');
    });
}

function addRowToTable(data) {
    const table = document.getElementById('maintenanceTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const cells = [
        data.apartmentNumber,
        data.paymentStatus,
        data.paymentDate,
        data.paymentAmount,
        data.paymentMethod,
        data.pastBillPaid,
        data.userId || 'N/A', // Display 'N/A' if userId is not available
    ];
    cells.forEach((cellData) => {
        const cell = newRow.insertCell();
        cell.textContent = cellData;
    });
}

function loadMaintenanceData() {
    fetch('http://localhost:5000/api/maintenance')
    .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch maintenance data');
        return response.json();
    })
    .then((data) => {
        const tableBody = document.getElementById('maintenanceTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach((item) => addRowToTable(item)); // Add each item to the table
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to load maintenance data. Please try again.');
    });
}

function clearForm() {
    document.getElementById('apartmentNumber').value = '';
    document.getElementById('paymentStatus').value = '';
    document.getElementById('paymentDate').value = '';
    document.getElementById('paymentAmount').value = '';
    document.getElementById('paymentMethod').value = '';
    document.getElementById('pastBillPaid').value = '';
}

function goBackToGrihaPravesh() {
    window.location.href = '../homepage/homepage.html'; // Replace with the correct path
}