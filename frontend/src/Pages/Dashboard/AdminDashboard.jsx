import React from 'react';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className='pt-3'>
      <Navbar baseRoute='/admin-dashboard' />
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
