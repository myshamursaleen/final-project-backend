/*const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//bcrypt library to hash passwords
//jsonwebtoken library to handle JWT token generation and verification

const loginRouter = express.Router();


loginRouter.post('/api1/login', async (req, res) => {
  const { user_name, password } = req.body;

  console.log(req.body);
  
  try {
    // Fetch user from the database based on the provided user_name
    const query = 'SELECT * FROM users WHERE user_name = ?';
    db.query(query, [user_name], async (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        // User not found in the database
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // Password does not match
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // User authentication successful, generate a JWT token
      const token = jwt.sign({ user_name: user.user_name }, 'your-secret-key', {
        expiresIn: '1h', // Token will expire in 1 hour
      });

      res.json({ message: 'Login successful!', token });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = loginRouter;*/