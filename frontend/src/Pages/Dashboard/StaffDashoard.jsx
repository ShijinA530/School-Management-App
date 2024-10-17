import React from 'react';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

const StaffDashboard = () => {
  return (
    <div className='pt-3'>
      <Navbar baseRoute='/staff-dashboard' />
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default StaffDashboard;
