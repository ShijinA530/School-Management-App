import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import StaffDashboard from './Pages/Dashboard/StaffDashoard';
import LibrarianDashboard from './Pages/Dashboard/LibrarianDashboard';
import StudentDetails from './Pages/StudentDetails';
import FeeDetails from './Pages/FeeDetails';
import LibraryHistory from './Pages/LibraryHistory';
import AccountManagement from './Pages/AccountManagement';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';

const PrivateRoute = ({ children, rolesAllowed }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!rolesAllowed.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Router>
      <Routes>
        {/* Public Route - Login */}
        <Route
          path='/login'
          element={
            !user ? (
              <Login />
            ) : (
              user.role === 'Admin' ? 
                <Navigate to='/admin-dashboard' /> :
              user.role === 'Office Staff' ?
                <Navigate to='/staff-dashboard' /> :
                <Navigate to='/librarian-dashboard' />
            )
          }
        />

        {/* Admin Dashboard Route with Nested Routes */}
        <Route
          path='/admin-dashboard'
          element={
            <PrivateRoute rolesAllowed={['Admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          {/* Default redirect to "students" */}
          <Route index element={<Navigate to="students" />} />

          {/* Nested Routes under Admin Dashboard */}
          <Route path="students" element={<StudentDetails />} />
          <Route path="fees" element={<FeeDetails />} />
          <Route path="library" element={<LibraryHistory />} />
          <Route path="accounts" element={<AccountManagement />} />
        </Route>

        {/* Office Staff Dashboard Route with Nested Routes */}
        <Route
          path='/staff-dashboard'
          element={
            <PrivateRoute rolesAllowed={['Office Staff']}>
              <StaffDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="students" />} />
          {/* Nested Routes under Staff Dashboard */}
          <Route path="students" element={<StudentDetails />} />
          <Route path="fees" element={<FeeDetails />} />
          <Route path="library" element={<LibraryHistory />} />
        </Route>

        {/* Librarian Dashboard Route with Nested Routes */}
        <Route
          path='/librarian-dashboard'
          element={
            <PrivateRoute rolesAllowed={['Librarian']}>
              <LibrarianDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="students" />} />
          {/* Nested Routes under Librarian Dashboard */}
          <Route path="students" element={<StudentDetails />} />
          <Route path="library" element={<LibraryHistory />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
