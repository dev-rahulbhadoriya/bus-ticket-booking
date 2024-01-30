# Bus Ticket Booking System - Node Express Service

Welcome to the Bus Ticket Booking System Node.js and Express service. This service provides a backend for managing bus ticket reservations, and it's built using various libraries and tools.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Dependencies](#dependencies)
- [Deployment](#deployment)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/dev-rahulbhadoriya/bus-ticket-booking.git
   cd bus-ticket-booking/server

2. **Install dependencies:**

    ```
    npm install
    
## Configuration
    
1. **Environment Variables:**

    Create a .env file in the root of your project with the following variables:
    env
   ```
    PORT=3000
    DB_HOST=your-mysql-host
    DB_USER=your-mysql-username
    DB_PASSWORD=your-mysql-password
    DB_DATABASE=your-mysql-database
    JWT_SECRET=your-secret-key
   ```
   Adjust the values according to your specific setup.

   **Database Setup:**
      Make sure you have a MySQL database set up, and the connection details provided in the .env file.
      ```
      npm run migrate
      ```
      This will run Sequelize migrations to create the necessary database tables.

   **Development:**
    
      ```
      npm run start:dev
      ```
    This command starts the server in development mode using PM2 for automatic server restarts on file changes.

   **Production:**
   
    ```
    npm run start:prod
    ```
  To run the server in production, use the start script. Consider using a process manager like pm2 to keep the service running.


  **Dependencies:**
    ```
    bcrypt,
    body-parser,
    cors,
    dotenv,
    express,
    helmet,
    http-status,
    joi,
    jsonwebtoken,
    moment,
    mysql2,
    nodemailer,
    nodemon,
    passport,
    passport-jwt,
    pm2,
    sequelize,
    winston,
    xss-clean
    ```
    
  **Deployment:**
    The service has been successfully deployed on AWS EC2 instances. Ensure that the necessary environment variables are set for production in the .env file.
