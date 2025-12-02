import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function FormPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="h-20 md:h-24"></div>

      <main className="flex flex-col items-center justify-start flex-grow px-4 py-8 relative z-0">
        <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border-2 border-red-600 rounded-2xl shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)] w-full max-w-lg p-8 mt-8 relative z-10 backdrop-blur-sm">

          <div className="flex justify-center mb-6">
            <img src="/images/logo.png" alt="CineHaven Logo" className="h-16 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
          </div>

          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-6">
            Add / Edit Movie
          </h1>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate("/home"); }}>
            <div>
              <label htmlFor="title" className="block text-base mb-2 text-red-400 font-semibold">Movie Title</label>
              <input 
                type="text" 
                id="title" 
                placeholder="Enter movie title"
                className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300" 
                required 
              />
            </div>

            <div>
              <label htmlFor="genre" className="block text-base mb-2 text-red-400 font-semibold">Genre</label>
              <div className="relative">
                <select 
                  id="genre" 
                  title="Select movie genre"
                  className="w-full p-3 rounded-lg bg-black text-white border-2 border-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300 appearance-none cursor-pointer pr-10"
                  required
                >
                  <option value="" className="bg-zinc-900 text-gray-400">Select genre</option>
                  <option value="Action" className="bg-zinc-900 text-white">Action</option>
                  <option value="Drama" className="bg-zinc-900 text-white">Drama</option>
                  <option value="Comedy" className="bg-zinc-900 text-white">Comedy</option>
                  <option value="Horror" className="bg-zinc-900 text-white">Horror</option>
                  <option value="Romance" className="bg-zinc-900 text-white">Romance</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="year" className="block text-base mb-2 text-red-400 font-semibold">Release Year</label>
                <input 
                  type="number" 
                  id="year" 
                  placeholder="2024" 
                  min="1900" 
                  max="2100"
                  className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300" 
                  required 
                />
              </div>

              <div>
                <label htmlFor="rating" className="block text-base mb-2 text-red-400 font-semibold">Rating</label>
                <input 
                  type="number" 
                  step="0.1" 
                  id="rating" 
                  placeholder="8.5" 
                  min="0" 
                  max="10"
                  className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300" 
                  required 
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-base mb-2 text-red-400 font-semibold">Description</label>
              <textarea 
                id="description" 
                rows="4" 
                placeholder="Write a short description..."
                className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 resize-none transition-all duration-300" 
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300 transform hover:scale-[1.02]"
            >
              Save Movie
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
