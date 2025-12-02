import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/form" element={<FormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
