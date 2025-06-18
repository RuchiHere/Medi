import React, { useState } from 'react';

const UserForm = ({ onSave }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);  // send data to App.jsx
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Enter Your Info</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <br /><br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <br /><br />
      <button type="submit">Start Prediction</button>
    </form>
  );
};

export default UserForm;
