# ClouSec Website

This project implements a website for ClouSec with blog and case studies components featuring pagination.

## Features

### Blog and Case Studies with Pagination

- **Home Page (http://localhost:5173/)**
  - Displays 3 cards per page in both Blog and Case Studies components using pagination
  - Each card shows:
    - Image (thumbnail)
    - Title
    - Date (formatted)
    - Content preview limited to 25 words
    - "Read More" button that leads to the full content

- **Blogs Page (http://localhost:5173/blogs/)**
  - Shows the Blog component with pagination, displaying 6 cards per page
  - Same card layout as on the home page

- **Case Studies Page (http://localhost:5173/case-studies/)**
  - Shows the Case Studies component with pagination, displaying 6 cards per page
  - Same card layout as on the home page

### Contact Form with Email Functionality

- **Contact Page (http://localhost:5173/contact/)**
  - Displays a contact form with the following fields:
    - First Name (required)
    - Last Name
    - Business Email (required)
    - Company (required)
    - Job Title
    - Phone
    - Country
    - Message (required)
  - Form submission sends an email with all the provided information
  - Shows success/error messages after submission

### Pagination Behavior

- Users can navigate through pages of content
- Pagination controls are visible below the cards
- The pagination count dynamically adjusts to the number of items available

### Content Handling

- Content text is truncated to 25 words in preview mode
- The "Read More" button expands the content or navigates to a detailed page with full content

## Implementation Details

The implementation includes:

1. **Pagination Component**: A reusable component that handles page navigation
2. **BlogCard and CaseStudyCard Components**: Reusable card components for displaying blog and case study previews
3. **BlogList and CaseStudyList Components**: Components that fetch and display the content with pagination
4. **Route-aware Display**: Components detect which route they're on and adjust the number of items per page accordingly
5. **ContactForm Component**: Handles form submission and email sending functionality
6. **Email Service**: Backend service for processing and sending emails

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Visit http://localhost:5173/ in your browser

## API Integration

The components fetch data from the backend API at http://localhost:3000 with the following endpoints:
- `/api/blogs` - Get all blog posts
- `/api/case-studies` - Get all case studies
- `/api/send-email` - Send contact form data via email

## Backend Setup for Email Functionality

To enable the email functionality:

1. Navigate to the server directory: `cd server`
2. Install server dependencies: `npm install`
3. Configure your SMTP settings in `emailHandler.js`
4. Start the server: `node emailHandler.js`
