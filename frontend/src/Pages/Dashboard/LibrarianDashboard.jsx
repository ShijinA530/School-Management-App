import React from 'react';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

const LibrarianDashboard = () => {
  return (
    <div className='pt-3'>
      <Navbar baseRoute='/librarian-dashboard'/>
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default LibrarianDashboard;
