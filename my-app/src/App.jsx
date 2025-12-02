// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <div className="App bg-black text-white min-h-screen">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* default route */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
