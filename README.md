# Railway Booking Management System

A full-stack web application for managing railway bookings, built with Node.js, Express, MongoDB, and a modern vanilla JavaScript frontend.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT.
- **Train Search**: Search trains by source, destination, and date.
- **Booking System**: Real-time ticket booking with PNR generation.
- **Admin Panel**: Dedicated dashboard for managing trains, viewing booking stats, and monitoring revenue.
- **My Bookings**: View and manage booked tickets.
- **Cancellation**: Easy ticket cancellation.
- **Responsive UI**: Modern, card-based layout using CSS Flexbox/Grid.

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Fetch API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## 📂 Project Structure

```
/
├── public/                 # Frontend Static Assets
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side Logic (Auth, API calls)
│   ├── pages/             # Application Pages (Dashboard, Search, etc.)
│   ├── index.html         # Login Page
│   └── register.html      # Registration Page
├── src/                    # Backend Source Code
│   ├── config/            # Database Configuration
│   ├── controllers/       # Route Controllers
│   ├── middleware/        # Auth Middleware
│   ├── models/            # Mongoose Models
│   ├── routes/            # API Routes
│   └── server.js          # Entry Point
└── package.json
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Trains & Bookings
- `GET /api/train/list` - Get all available trains
- `GET /api/train/search` - Search trains (query: from, to, date)
- `POST /api/train/bookTicket` - Book a ticket
- `GET /api/train/bookings` - Get user's bookings
- `DELETE /api/train/bookings/:id` - Cancel a booking

### User
- `GET /api/user/profile` - Get current user profile

## 🏃‍♂️ How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set Environment Variables**:
    Create a `.env` file with:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

3.  **Start Server**:
    ```bash
    npm run dev
    ```

4.  **Access App**:
    Open `http://localhost:5000` in your browser.

## 📝 Resume Description

**Railway Booking Management System**
*Developed a comprehensive web-based railway reservation system using Node.js, Express, and MongoDB.*
- **Frontend**: Designed a responsive, modern UI with HTML5, CSS3, and vanilla JavaScript, implementing a single-page-application feel with Fetch API.
- **Backend**: Built RESTful APIs for user authentication (JWT), train search, and booking management.
- **Database**: Modeled complex data relationships for trains, users, and bookings using Mongoose.
- **Key Features**: Implemented secure auth flows, real-time booking updates, and dynamic search functionality.
