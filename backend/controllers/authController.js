// controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const authController = {
  // Handle user registration
  register: (req, res) => {
    const { fullName, email, mobile, apartment, password } = req.body;

    if (!fullName || !email || !mobile || !apartment || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    User.create({ fullName, email, mobile, apartment, password }, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Failed to register user' });
      }
      console.log('User registered successfully:', result);
      res.status(200).json({ message: 'User registered successfully' });
    });
  },

  // Handle user login
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    User.findByEmail(email, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Failed to login' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    });
  },
};

module.exports = authController;