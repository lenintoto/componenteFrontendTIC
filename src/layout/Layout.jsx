import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import buhoImage from '../assets/BUHO_Abstraccion_EPN_small.jpg'

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${buhoImage})` }}>
          <div className="min-h-full bg-white/70">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
