import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="h-12 md:h-16"></div>

      <main className="flex flex-col items-center justify-start flex-grow px-4 py-8 relative z-0">
        <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border-2 border-red-600 rounded-2xl shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)] w-full max-w-lg p-8 mt-4 relative z-10 backdrop-blur-sm">

          <div className="flex justify-center mb-6">
            <img src="/images/logo.png" alt="CineHaven Logo" className="h-16 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
          </div>

          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-6">
            Welcome to CineHaven
          </h1>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate("/home"); }}>
            <div>
              <label htmlFor="email" className="block text-base mb-2 text-red-400 font-semibold">Email</label>
              <input 
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-base mb-2 text-red-400 font-semibold">Password</label>
              <input 
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300 transform hover:scale-[1.02]"
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
      </main>

      <Footer />
    </div>
  );
}
