# Healthcare Management System

A full-stack web application designed to streamline healthcare management processes. This system enables patients to book appointments, manage medical records, and interact with healthcare providers, while allowing doctors to manage their schedules and patient data efficiently.

## Features

- **User Authentication**: Secure login and registration for patients and doctors using JWT tokens.
- **Patient Dashboard**: View and manage personal appointments, medical records, and profile information.
- **Doctor Dashboard**: Manage appointments, view patient medical records, and update availability.
- **Appointment Booking**: Patients can book, reschedule, or cancel appointments with doctors.
- **Medical Records Management**: Secure storage and retrieval of patient medical history and records.
- **Doctor Directory**: Browse and select doctors based on specialization and availability.
- **Role-based Access**: Different interfaces and permissions for patients and doctors.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router DOM**: Declarative routing for React
- **Axios**: HTTP client for API requests
- **JWT Decode**: Decode JWT tokens for user authentication

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **MySQL**: Relational database management system
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing library
- **CORS**: Cross-Origin Resource Sharing middleware

## Setup Instructions (Local Development)

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following environment variables:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASS=your_mysql_password
   DB_NAME=healthcare_db
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

4. Create the MySQL database:
   - Open MySQL command line or a GUI tool like phpMyAdmin
   - Create a database named `healthcare_db`
   - The application will handle table creation automatically

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

### Start the Backend Server
1. From the backend directory:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`

### Start the Frontend Application
1. From the frontend directory:
   ```bash
   npm start
   ```
   The React app will start on `http://localhost:3000`

### Access the Application
- Open your web browser and navigate to `http://localhost:3000`
- Register as a new user or login with existing credentials
- Use the application based on your role (patient or doctor)

## Contributing

We welcome contributions to the Healthcare Management System! To contribute:

1. **Fork the repository** on GitHub
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and ensure they follow the project's coding standards
4. **Test your changes** thoroughly
5. **Commit your changes** with descriptive commit messages:
   ```bash
   git commit -m "Add feature: description of changes"
   ```
6. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request** on GitHub

### Guidelines
- Follow the existing code style and structure
- Write clear, concise commit messages
- Ensure all tests pass before submitting
- Update documentation if necessary

