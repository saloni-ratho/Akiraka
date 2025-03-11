const axios = require('axios');

// Base URL for the backend API
const BASE_URL = 'http://localhost:5000/api';

// Test user data
const testUser = {
  fullName: 'Sakshi Santosh Agnihotri',
  email: 'sakshiagnihotri26@gmail.com',
  mobile: '8830856899',
  apartment: 'A106',
  password: 'Sakshi@A106',
};

// Test maintenance data
const testMaintenance = {
  userId: 1, // Replace with the actual user ID after registration
  description: 'Test maintenance request',
};

// Function to test user registration
async function testRegistration() {
  try {
    console.log('Testing user registration...');
    const response = await axios.post(`${BASE_URL}/register`, testUser);
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data : error.message);
  }
}

// Function to test user login
async function testLogin() {
  try {
    console.log('Testing user login...');
    const response = await axios.post(`${BASE_URL}/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    console.log('Login successful:', response.data);
    return response.data.user; // Return the logged-in user data
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
  }
}

// Function to test maintenance request submission
async function testMaintenanceRequest(userId) {
  try {
    console.log('Testing maintenance request submission...');
    const response = await axios.post(`${BASE_URL}/maintenance`, {
      userId,
      description: testMaintenance.description,
    });
    console.log('Maintenance request submitted:', response.data);
  } catch (error) {
    console.error('Maintenance request failed:', error.response ? error.response.data : error.message);
  }
}

// Run all tests
async function runTests() {
  await testRegistration(); // Test user registration
  const user = await testLogin(); // Test user login
  if (user) {
    await testMaintenanceRequest(user.id); // Test maintenance request
  }
}

// Execute the tests
runTests();