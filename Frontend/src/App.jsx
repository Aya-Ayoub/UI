import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import FormPage from "./pages/FormPage";

import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";

function AppContent() {
  const location = useLocation();

  // Hide navbar on login & signup pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      
      {/* Render Navbar only if NOT on login or signup */}
      {!hideNavbar && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Login is now the main page */}
          <Route path="/" element={<LoginPage />} />

          {/* HomePage moved to /home */}
          <Route path="/home" element={<HomePage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Signup remains here */}
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
