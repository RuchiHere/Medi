import React, { useState } from "react";
import PredictForm from "./components/PredictForm";
import Layout from "./components/Layout";
import UserForm from "./components/UserForm";

function App() {
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const handleSaveUser = (data) => setUser(data);
  const handleLogout = () => setUser(null);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <>
      <header style={{ textAlign: "center", background: "#222", color: "#fff", padding: "15px" }}>
        🧬 MediPredict - Disease Predictor
      </header>

      {user ? (
        <Layout user={user} onLogout={handleLogout} collapsed={collapsed} toggleSidebar={toggleSidebar}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PredictForm />
          </div>
        </Layout>
      ) : (
        <UserForm onSave={handleSaveUser} />
      )}
    </>
  );
}

export default App;
