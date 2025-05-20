const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { router: authRouter } = require('./routes/auth');
const blogsRouter = require('./routes/blogs');
const caseStudiesRouter = require('./routes/caseStudies');
const commentsRouter = require('./routes/comments');
const documentsRouter = require('./routes/documents');
const db = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Increase JSON payload size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize database
(async () => {
  try {
    // The initDb function is already called when db.js is imported
    console.log('Database initialization completed');
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
})();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/case-studies', caseStudiesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/documents', documentsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
