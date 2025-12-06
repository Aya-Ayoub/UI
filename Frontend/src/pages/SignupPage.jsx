import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useProfile } from "../context/ProfileContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useProfile();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});    
  const [status, setStatus] = useState("");     

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); 
    setStatus("");                                
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser = {
      name: form.firstName + " " + form.lastName,
      email: form.email,
      password: form.password,
      age: form.age,
      avatar: "/images/default-avatar.jpg",
      joined: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      }),
      watchlist: [],
      watched: [],
      unwatched: []
    };

    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      const createdUser = await res.json();

      setUser(createdUser);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="h-12 md:h-16"></div>

      <main className="flex flex-col items-center flex-grow px-4 py-8">
        <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border-2 border-red-600 rounded-2xl shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)] w-full max-w-lg p-8 mt-4 backdrop-blur-sm">

          {status && (
            <div className="mb-4 text-red-400 text-center font-medium">
              {status}
            </div>
          )}

          <div className="flex justify-center mb-6">
            <img src="/images/logo.png" alt="CineHaven Logo" className="h-16 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
          </div>

          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-6">
            Create Your Account
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-base mb-2 text-red-400 font-semibold">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full p-3 rounded-lg bg-black text-white border-2 border-zinc-500"
                  required
                />
              </div>

              <div className="flex-1">
                <label htmlFor="lastName" className="block text-base mb-2 text-red-400 font-semibold">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full p-3 rounded-lg bg-black text-white border-2 border-zinc-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="age" className="block text-base mb-2 text-red-400 font-semibold">Age</label>
              <input
                type="number"
                id="age"
                value={form.age}
                onChange={handleChange}
                min="7"
                max="120"
                placeholder="Enter your age"
                className="w-full p-3 rounded-lg bg-black text-white border-2 border-zinc-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base mb-2 text-red-400 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-black text-white border-2 border-zinc-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-base mb-2 text-red-400 font-semibold">Password</label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full p-3 rounded-lg bg-black text-white border-2 border-zinc-500"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-base mb-2 text-red-400 font-semibold">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full p-3 rounded-lg bg-black text-white border-2 border-zinc-500"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <a href="/" className="text-red-500 hover:underline">Log in</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
