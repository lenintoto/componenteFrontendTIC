import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 bg-[url('/BUHO_ABSTRACCION_EPN_small.jpg')] bg-cover bg-center bg-no-repeat">
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
