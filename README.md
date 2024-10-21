# School Management App

The School Management App is a MERN (MongoDB, Express, React, Node.js) application that allows users to perform CRUD (Create, Read, Update, Delete) operations to manage student details across various classes. The system also handles library history and fees history for each student, which can be managed by specific roles within the school.

## Features

The application has the following features:

1. **Role-Based Access Control (RBAC):**
   - The system has separate logins for different user roles: School Admin, Office Staff, and Librarian.
   - The Admin has full control over both the Office Staff and Librarians, including the ability to create, edit, and delete staff and librarian accounts.
   - The Office Staff has access to all student details, including the ability to view library reviews and manage fees history
   - The Librarian has access to all library details enabling them to manage the borrowing records of students effectively. And has view-only access to student details.

2. **User Authentication:**
   - The application includes user authentication, allowing users to log in based on their roles, which dictates their access and capabilities within the system.

3. **CRUD Operations:**
   - The system allows users to perform CRUD operations on student details, library history, and fees history.

4. **Confirmation Dialogs:**
   - The application includes confirmation dialogs for all critical actions, such as deleting a student, library record, or fees history entry, to prevent accidental deletions or modifications.

5. **State Management (Redux):**
   - The application uses Redux for global state management, with separate reducers for student, library, fees, and authentication states.

## Setup Instructions

### Prerequisites

1. **Node.js** (v14 or later)
2. **MongoDB** (Installed locally or using a cloud provider like MongoDB Atlas)

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ShijinA530/School-Management-App.git
   cd School-Management-App

2. **Backend Setup**:
   - Navigate to the `backend` folder and install dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Create a `.env` file in the `backend` directory with the following content:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/GVR
     JWT_SECRET=unnimol
     EMAIL_ADDRESS=shijinasasi835@gmail.com
     EMAIL_PASSWORD=muse ydse cdsj ozeq
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` folder and install dependencies:
     ```bash
     cd ../frontend
     npm install
     ```
   - Create a `.env` file in the `frontend` directory with the following content:
     ```
     VITE_BACKEND_URL=http://localhost:5000
     ```

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd ../backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the App**:
   - The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.

   - You can login as an admin using:
      email - shijin@example.com &
      password - 12345

## Technologies Used

- **Frontend:** React.js (Using Vite), Redux, Chakra UI, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Libraries:** Axios, React Router, Mongoose, JSON Web Token, Bcrypt etc..