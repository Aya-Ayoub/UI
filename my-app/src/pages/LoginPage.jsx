// src/pages/LoginPage.jsx
import React, { useState } from "react";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Redirect to home
    window.location.href = "/home";
};

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <div className="bg-black border border-red-700 rounded-2xl shadow-[0_0_30px_-10px_rgba(255,0,0,0.6)] w-11/12 max-w-md p-8">
        
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.png"
            alt="CineHaven Logo"
            className="h-16 drop-shadow-lg"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-6">
          Welcome to CineHaven
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-800 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>

      <Footer />
    </div>
  );
}
