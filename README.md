### Incruiter-Auth
This project is a full-stack application for user authentication and authorization. It includes a React frontend and an Express backend with MongoDB for data storage. The application supports user registration, login, email verification, password reset, and user authentication.

## How to Run

### Client

1. Navigate to the `client` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Server

1. Navigate to the `server` directory.
2. Install dependencies: `npm install`
3. Start the server: `npm run server`

## Environment Variables

### Client

- `VITE_BACKEND_URL`: URL of the backend server.


### Server

## Server .env content

- `MONGODB_URL`:'mongodb+srv://incruiter:incruiter@cluster0.5vldt.mongodb.net'
- `JWT_SECRET`: 'incruiter'
- `NODE_ENV`: 'production'
- `SMTP_USER`: "872754001@smtp-brevo.com"
- `SMTP_PASS`: "Z2Aph9d1gCYRzvI8"
- `SENDER_EMAIL`: "pkallen000@gmail.com"

## client .env content
`VITE_BACKEND_URL`:'http://localhost:5000'

## Server

### Dependencies

- Express
- Mongoose
- JWT
- Bcrypt
- Nodemailer
- Dotenv
- Cookie-parser
- Cors

### Configuration

- `config/dbConnect.js`: MongoDB connection configuration.
- `config/nodemailer.js`: Nodemailer configuration for sending emails.
- `.env`: Environment variables for the server.

### Models

- `models/user.js`: Mongoose model for user data.

### Middleware

- `middleware/userAuth.js`: Middleware for user authentication using JWT.

### Controllers

- `controllers/auth.js`: Controller functions for authentication routes.
  - `register`: Registers a new user.
  - `login`: Logs in an existing user.
  - `logout`: Logs out the user.
  - `sendVerifyOtp`: Sends OTP for email verification.
  - `verifyOtp`: Verifies the OTP for email verification.
  - `isAuthenticated`: Checks if the user is authenticated.
  - `sendPasswordResetOtp`: Sends OTP for password reset.
  - `resetPassword`: Resets the user's password.

- `controllers/userController.js`: Controller functions for user routes.
  - `getUserData`: Retrieves user data.

### Routes

- `routes/authRoutes.js`: Routes for authentication.
  - `POST /register`: Registers a new user.
  - `POST /login`: Logs in an existing user.
  - `POST /logout`: Logs out the user.
  - `POST /send-verify-otp`: Sends OTP for email verification.
  - `POST /verify-account`: Verifies the OTP for email verification.
  - `GET /is-auth`: Checks if the user is authenticated.
  - `POST /send-reset-otp`: Sends OTP for password reset.
  - `POST /reset-password`: Resets the user's password.
 
- `routes/userRoutes.js`: Routes for user data.
  - `GET /data`: Retrieves user data.

### Server

- `server.js`: Main server file that sets up the Express application and connects to MongoDB.

## Client

### Dependencies

- React
- React Router DOM
- Axios
- React Toastify
- Tailwind CSS
- Vite

### Main Components

- `src/App.jsx`: Main application component with routes for different pages.
- `src/components/Navbar.jsx`: Navigation bar component.
- `src/components/Header.jsx`: Header component for the home page.
- `src/pages/EmailVerify.jsx`: Email verification page.
- `src/pages/Home.jsx`: Home page.
- `src/pages/Login.jsx`: Login and registration page.
- `src/pages/ResetPassword.jsx`: Password reset page.

### Context

- `src/context/AppContext.jsx`: Context provider for managing global state and authentication.

### Assets

- Various images and icons used in the application.

### Configuration

- `vite.config.js`: Vite configuration file.
- `eslint.config.js`: ESLint configuration file.
- `.env`: Environment variables for the client.

## Authentication

The application uses JWT for authentication. Tokens are stored in HTTP-only cookies to enhance security. The `userAuth` middleware is used to protect routes that require authentication.

## Email Verification and Password Reset

The application uses Nodemailer to send OTPs for email verification and password reset. The OTPs are stored in the user model and have expiration times to ensure security.

## ESLint Configuration

The project uses ESLint for code quality and consistency. The configuration is defined in `eslint.config.js`.

## Tailwind CSS

The project uses Tailwind CSS for styling. The configuration is defined in `vite.config.js`.

## Vite

The project uses Vite as the build tool for the client. The configuration is defined in `vite.config.js`.

## Conclusion

This project provides a complete solution for user authentication and authorization with a React frontend and an Express backend. It includes features like user registration, login, email verification, password reset, and user authentication. The project is configured with ESLint for code quality and Tailwind CSS for styling.
