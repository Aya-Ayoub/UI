import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import FormPage from "./pages/FormPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";

import AdminRoute from "./components/AdminRoute";

function AppContent() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    /* 🔥 THIS IS THE ROOT THEME CONTAINER */
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {!hideNavbar && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* 🔐 ADMIN-ONLY ROUTE */}
          <Route
            path="/form"
            element={
              <AdminRoute>
                <FormPage />
              </AdminRoute>
            }
          />
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
