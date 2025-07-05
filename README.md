# Attendify - QR and OTP Based Attendance System

## What is Attendify?

Attendify is a modern attendance tracking system that uses QR codes and OTP (One-Time Passwords) to mark attendance. It's designed for schools and colleges to make attendance management easier and more secure.

## Installation
1. Clone this repository
2. Install dependencies for both frontend and backend:

### Backend - Intalling dependencies using -  npm i 
Starting server using -  node index.js    // you can change the script as you want 
Mongodb setup  -  add your own mongodb api for conntecting database in index.js file
Admin registration  - 123456  is the secret key    --- //you can change it as per your requirement

### Frontend - Intalling dependencies - npm i --force    // the dependencies may have deprecated as it is made is 2023 so force install 

## Key Features

- **Two attendance methods**:
  - QR code scanning
  - OTP (one-time password) entry
- **Different user roles**:
  - Teachers/admins can create lectures
  - Students can mark their attendance
- **Automatic attendance tracking** - marks students as absent if they don't attend
- **Simple dashboard** for both teachers and students

## How It Works

### For Teachers:
1. Create a lecture session
2. The system generates a unique QR code and OTP
3. Share these with students
4. After the class, view attendance reports

### For Students:
1. Log in to your account
2. Select a lecture
3. Either scan the QR code or enter the OTP to mark attendance
4. View your attendance history

## Technology Used

**Frontend**:
- React.js
- React Router for navigation
- Axios for API calls

**Backend**:
- Node.js with Express
- MongoDB database
- Mongoose for database operations

## Setup Instructions


