// This is a server-side implementation example for handling email sending
// You would need to set this up in your backend server (Node.js/Express)

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure nodemailer transporter
// For production, use your actual SMTP credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // Replace with your email
    pass: 'your-password', // Replace with your password or app-specific password
  },
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      company,
      jobTitle,
      phone,
      country,
      message,
    } = req.body;

    // Validate required fields
    if (!firstName || !email || !company || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields',
      });
    }

    // Format the email content
    const mailOptions = {
      from: 'your-email@example.com', // Replace with your email
      to: 'recipient@example.com', // Replace with recipient email
      subject: `New Contact Form Submission from ${firstName} ${lastName || ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        ${jobTitle ? `<p><strong>Job Title:</strong> ${jobTitle}</p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${country ? `<p><strong>Country:</strong> ${country}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again.',
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for potential use with serverless functions
module.exports = app;
