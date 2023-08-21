/*const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());

// User registration route
const registerRouter = express.Router();

registerRouter.post('/api/register', async (req, res) => {
  const { user_name, email, password, userType } = req.body;

  try {
    // Check if the user already exists in the database
    const checkQuery = 'SELECT * FROM users WHERE user_name = ?';
    db.query(checkQuery, [user_name], async (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error querying the database:', checkErr);
        return res.status(500).json({ message: 'Server error' });
      }

      if (checkResults.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
 // Insert the user data into the database
 const insertQuery = 'INSERT INTO users (user_name, email, password, userType) VALUES (?, ?, ?, ?)';
 db.query(insertQuery, [user_name, email, hashedPassword, userType], (insertErr, insertResult) => {
   if (insertErr) {
     console.error('Error inserting user data:', insertErr);
     return res.status(500).json({ message: 'Server error' });
   }

   console.log('User registered successfully!');
   res.json({ success: true, message: 'User registered successfully' });
 });
});
} catch (error) {
console.error('Error:', error);
res.status(500).json({ message: 'Server error' });
}
});

app.use(registerRouter);
*/