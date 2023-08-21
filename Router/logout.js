const express = require('express');
const logoutRouter = express.Router();
const session = require('express-session');

// Set a secret for the session
const sessionSecret = 'logout';

logoutRouter.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Set the session expiration time (in milliseconds) here
    // You can set 'secure: true' if using HTTPS in production
    // secure: true,
  },
}));

logoutRouter.post('/api/logout', (req, res) => {
  try {
    // Destroy the session:
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ message: 'Error logging out' });
      } else {
        res.json({ message: 'Logout successful' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = logoutRouter;
