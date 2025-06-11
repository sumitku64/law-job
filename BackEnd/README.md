# Law Job Website Backend

This is the backend server for the Law Job Website application. It provides APIs for user authentication, advocate profiles, intern profiles, and more.

## Project Structure

```
Backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── .env                # Environment variables
└── package.json        # Project dependencies
```

## Features

- User Authentication (JWT)
- Role-based Authorization
- File Upload Support
- MongoDB Database
- Input Validation
- Error Handling

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/law-job-website
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Advocates
- GET `/api/advocates` - Get all advocates
- GET `/api/advocates/:id` - Get advocate by ID
- PUT `/api/advocates/:id` - Update advocate profile
- POST `/api/advocates/:id/reviews` - Add review for advocate

### Interns
- GET `/api/interns` - Get all interns
- GET `/api/interns/:id` - Get intern by ID
- PUT `/api/interns/:id` - Update intern profile
- POST `/api/interns/:id/applications` - Submit internship application

## Error Handling

The API uses consistent error responses:

```json
{
  "message": "Error message here"
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Input validation and sanitization
- Protected routes using middleware
- File upload size limits
- CORS configuration 