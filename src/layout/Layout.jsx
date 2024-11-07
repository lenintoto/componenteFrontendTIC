import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar';

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
