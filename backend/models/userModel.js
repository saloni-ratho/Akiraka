// models/userModel.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  // Create a new user
  create: (userData, callback) => {
    const { fullName, email, mobile, apartment, password } = userData;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `
      INSERT INTO users (fullName, email, mobile, apartment, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [fullName, email, mobile, apartment, hashedPassword], callback);
  },

  // Find a user by email
  findByEmail: (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], callback);
  },
};

module.exports = User;