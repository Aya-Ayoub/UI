// src/pages/SignupPage.jsx
import React, { useState } from "react";
import Footer from "../components/Footer";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    alert("Account created! (placeholder)");
    // Later: connect to backend
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
          Create Your Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm mb-1 text-gray-300">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full p-3 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm mb-1 text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full p-3 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm mb-1 text-gray-300">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              min="7"
              max="120"
              className="w-full p-3 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="w-full p-3 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm mb-1 text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full p-3 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-800 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/" className="text-red-500 hover:underline">
            Log in
          </a>
        </p>
      </div>

      <Footer />
    </div>
  );
}
