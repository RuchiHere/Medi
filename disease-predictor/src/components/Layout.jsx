import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, user, onLogout, collapsed, toggleSidebar }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={onLogout} collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main style={{ marginLeft: collapsed ? "70px" : "260px", padding: "20px", width: "100%" }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
