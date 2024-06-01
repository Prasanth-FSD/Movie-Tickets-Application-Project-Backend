# Movie Ticket Booking System Backend

This backend code provides the functionality for a movie ticket booking system. It includes features such as user registration and authentication, movie and theater management, booking handling, and email notifications.

### Features:
1. **User Management:**
   - User registration with encrypted password storage.
   - User login with JWT authentication.
   - Forgot password functionality with email reset link.

2. **Movie and Theater Management:**
   - Upload and manage movies and theaters.
   - Upload and manage carousel images for the website.

3. **Booking Handling:**
   - Allow users to book movie tickets.
   - Update booking status and store booking details.
   - Send confirmation emails to users upon successful booking.

### Technologies Used:
- **Node.js:** Backend JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing user and booking data.
- **Mongoose:** MongoDB object modeling tool.
- **bcrypt:** Library for hashing passwords.
- **jsonwebtoken (JWT):** For user authentication and authorization.
- **nodemailer:** For sending emails for password reset and booking confirmation.
- **dotenv:** For managing environment variables.

### Project Structure:
- **Controllers:** Contains functions to handle HTTP requests and business logic.
- **Models:** Defines MongoDB schemas for users, bookings, and data.
- **Routes:** Defines API routes for different functionalities.
- **Services:** Contains email sending functionality.
- **Config:** Contains configuration files.
- **Middleware:** Contains authentication middleware.

### Setting Up:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Start the server using `npm start`.

### Deployment:
- **Backend GitHub Repository:** [Insert Backend GitHub Repository Link]
- **Frontend GitHub Repository:** [Insert Frontend GitHub Repository Link]
- **Backend Render Deployment:** [Insert Backend Render Deployment Link]
- **Frontend Netlify Deployment:** [Insert Frontend Netlify Deployment Link]

### Frontend Integration:
To integrate this backend with a frontend application, you can make HTTP requests to the defined API endpoints using a frontend framework like React.js or Angular.

### License:
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

