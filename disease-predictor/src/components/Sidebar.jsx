import React from 'react';
import './Sidebar.css';

const Sidebar = ({ user, onLogout, collapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button onClick={toggleSidebar}>
        {collapsed ? "➡️" : "⬅️"}
      </button>

      {!collapsed && (
        <>
          <h2>User Info</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <h3>About Product</h3>
          <ul>
            <li>Disease Prediction</li>
            <li>Random Forest ML Model</li>
            <li>Version: 1.0</li>
          </ul>

          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
