import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#171717]">
      <Outlet />
    </div>
  );
};

export default Layout;
