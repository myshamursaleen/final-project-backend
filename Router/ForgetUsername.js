const express = require('express');
const Forgetpasswordrouter = express.Router();
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid'); //Library for generating unique IDs

// Store password reset tokens and their expiry in memory 
const passwordResetTokens = {};

// POST /api/forgot-password
Forgetpasswordrouter.post('/forgotpassword', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if the email exists in your user database
    const user = user.find(users => user.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate a unique token
    const token = uuidv4();
    
    // Store the token and its expiry time (e.g., 1 hour from now)
    passwordResetTokens[token] = {
      email,
      expiry: Date.now() + 3600000, // 1 hour in milliseconds
    };
    
    // Send an email to the user with the reset link
    const resetLink = `http://your-frontend-app/reset-password?token=${token}`;
    
    // Configure nodemailer with your email service provider's details
    const transporter = nodemailer.createTransport({
      // Your email service provider's configuration here
    });
    
    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Password Reset',
      html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ message: 'Password reset link sent successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = Forgetpasswordrouter;
