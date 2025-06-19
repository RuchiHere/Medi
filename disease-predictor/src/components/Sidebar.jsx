import React from "react";
import "./Sidebar.css";

const Sidebar = ({ userInfo, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="user-box">
        <h4>User Info</h4>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
