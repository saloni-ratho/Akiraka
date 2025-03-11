function submitForm() {
    // Get form values
    const numVisitors = document.getElementById("numVisitors").value.trim();
    const visitorName = document.getElementById("visitorName").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const vehicleNumber = document.getElementById("vehicleNumber").value.trim();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    // Validation rules
    const errors = [];

    // 1. Validate Number of Visitors
    if (numVisitors === "") {
        errors.push({ field: "numVisitors", message: "Number of Visitors is required." });
    } else if (isNaN(numVisitors) || parseInt(numVisitors) <= 0) {
        errors.push({ field: "numVisitors", message: "Number of Visitors must be a positive number." });
    }

    // 2. Validate Visitor Name
    if (visitorName === "") {
        errors.push({ field: "visitorName", message: "Visitor Name is required." });
    } else if (!/^[A-Za-z\s]+$/.test(visitorName)) {
        errors.push({ field: "visitorName", message: "Visitor Name should contain only letters and spaces." });
    }

    // 3. Validate Contact Number
    if (contactNumber === "") {
        errors.push({ field: "contactNumber", message: "Contact Number is required." });
    } else if (!/^[6-9]\d{9}$/.test(contactNumber)) {
        errors.push({ field: "contactNumber", message: "Contact Number must be a valid 10-digit Indian phone number." });
    }

    // 4. Validate Vehicle Number
    if (vehicleNumber !== "" && !/^[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}$/.test(vehicleNumber)) {
        errors.push({ field: "vehicleNumber", message: "Vehicle Number must be in the Indian format: AA11AA1111 or AA11A1111." });
    }

    // Display errors
    errors.forEach(error => {
        const errorElement = document.getElementById(`${error.field}Error`);
        if (errorElement) {
            errorElement.textContent = error.message;
        }
    });

    // If there are validation errors, stop submission
    if (errors.length > 0) {
        return;
    }

    // Create a JSON object to store the data
    const visitorData = {
        numVisitors: parseInt(numVisitors),
        visitorName: visitorName,
        contactNumber: contactNumber,
        vehicleNumber: vehicleNumber || null
    };

    // Send data to server using fetch API
    fetch('http://localhost:5000/api/visitors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(visitorData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert("Visitor data submitted successfully!");
        // Clear the form after submission
        document.getElementById("numVisitors").value = "";
        document.getElementById("visitorName").value = "";
        document.getElementById("contactNumber").value = "";
        document.getElementById("vehicleNumber").value = "";
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while submitting the data.");
    });
}