const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling cross-origin requests
const jwt = require('jsonwebtoken');
const dbUrl = process.env.DATABASE_URL;
const port = 5000; // Define the port
const app = express();



// Use the dbUrl to connect to your database
// Use the port to start your server
// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes


// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Akiraka@123', // Replace with your actual password
    database: 'akiraka'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit if connection fails
    }
    console.log('Connected to MySQL!');
});

// Test database connection
app.get('/api/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database connection failed' });
        }
        res.status(200).json({ message: 'Database connection successful', solution: results[0].solution });
    });
});

// Register Endpoint
app.post('/api/register', (req, res) => {
    const { fullName, email, mobile, apartment, password } = req.body;

    // Validate input
    if (!fullName || !email || !mobile || !apartment || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate mobile number length
    if (mobile.length < 10 || mobile.length > 15) {
        return res.status(400).json({ error: 'Mobile number must be between 10 and 15 digits' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert into database
    const query = `
        INSERT INTO user (fullName, email, mobile, apartment, password)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [fullName, email, mobile, apartment, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);

            // Handle duplicate email error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already exists' });
            }

            return res.status(500).json({ error: 'Failed to register user' });
        }

        // Registration successful
        res.status(200).json({ message: 'User registered successfully' });
    });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, apartment, fullName } = req.body;

    // Validate input
    if (!email || !apartment || !fullName) {
        console.error('Validation error: All fields are required');
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        console.error('Validation error: Invalid email format');
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate apartment format (if needed)
    const apartmentPattern = /^[A-Za-z0-9]+$/;
    if (!apartmentPattern.test(apartment)) {
        console.error('Validation error: Invalid apartment format');
        return res.status(400).json({ error: 'Invalid apartment format' });
    }

    // Query the database
    const query = `SELECT * FROM user WHERE email = ? AND apartment = ? AND fullName = ?`;
    db.query(query, [email, apartment, fullName], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length === 0) {
            console.error('Login failed: Invalid credentials');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Login successful
        console.log('Login successful for user:', result[0].email);
        res.status(200).json({ 
            message: 'Login successful', 
            user: result[0] // Return user data (excluding sensitive info like password)
        });
    });
});

// Maintenance Endpoint
app.post('/api/maintenance', (req, res) => {
    const { apartmentNumber, paymentStatus, paymentDate, paymentAmount, paymentMethod, pastBillPaid, userId } = req.body;

    // Insert into database
    const query = `
        INSERT INTO maintenance (apartmentNumber, paymentStatus, paymentDate, paymentAmount, paymentMethod, pastBillPaid, userId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [apartmentNumber, paymentStatus, paymentDate, paymentAmount, paymentMethod, pastBillPaid, userId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to add maintenance data' });
        }

        // Return the newly inserted data
        const newRecord = {
            id: result.insertId,
            apartmentNumber,
            paymentStatus,
            paymentDate,
            paymentAmount,
            paymentMethod,
            pastBillPaid,
            userId,
        };
        res.status(200).json(newRecord);
    });
});

// Get Maintenance Data Endpoint
app.get('/api/maintenance', (req, res) => {
    const query = 'SELECT * FROM maintenance';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching maintenance data:', err);
            return res.status(500).json({ error: 'Failed to fetch maintenance data' });
        }

        // Return all maintenance data
        res.status(200).json(results);
    });
});

// Submit complaint endpoint
app.post('/api/complaints', (req, res) => {
    const { apartment, complaint_type, complaint_text } = req.body;

    if (!apartment || !complaint_type || !complaint_text) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const query = `INSERT INTO complaints (apartment, complaint_type, complaint_text) VALUES (?, ?, ?)`;

    db.query(query, [apartment, complaint_type, complaint_text], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Failed to submit complaint' });
        }

        res.status(201).json({ success: true, message: 'Complaint submitted successfully!' });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/api/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database connection failed' });
        }
        res.status(200).json({ message: 'Database connection successful', solution: results[0].solution });
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

