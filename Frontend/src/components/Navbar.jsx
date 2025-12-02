import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-[9999]">
      <img 
        src="/images/logo.png" 
        alt="CineHaven Logo" 
        className="h-14 w-auto drop-shadow-lg" 
      />

      {/* Desktop Navigation */}
      <nav className="space-x-8 text-lg hidden md:flex mr-12 items-center">
        <Link to="/home" className="hover:text-red-500 drop-shadow-lg">
          Home
        </Link>
        <Link to="/list" className="hover:text-red-500 drop-shadow-lg">
          Movies
        </Link>
        <Link to="/dashboard" className="hover:text-red-500 drop-shadow-lg">
          Dashboard
        </Link>
        <img
          src="/images/search.png"
          alt="Search"
          className="h-6 w-6 inline-block cursor-pointer hover:opacity-80"
        />
        <Link to="/profile" className="hover:text-red-500 drop-shadow-lg">
          Profile
        </Link>
        <Link to="/form" className="hover:text-red-500 drop-shadow-lg">
          Add Movie
        </Link>
      </nav>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="md:hidden text-white focus:outline-none z-[9999] relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation Menu - Small Popup */}
      {isOpen && (
        <>
          {/* Popup Menu */}
          <div className="md:hidden fixed top-20 right-4 bg-black border-2 border-red-600 rounded-lg shadow-[0_0_30px_rgba(255,0,0,0.6)] z-[99999] animate-fadeIn">
            <nav className="flex flex-col py-4 px-6 space-y-3 text-base">
              <Link
                to="/home"
                className="hover:text-red-500 drop-shadow-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/list"
                className="hover:text-red-500 drop-shadow-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Movies
              </Link>
              <Link
                to="/dashboard"
                className="hover:text-red-500 drop-shadow-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition-colors">
                <img
                  src="/images/search.png"
                  alt="Search"
                  className="h-5 w-5"
                />
                <span>Search</span>
              </div>
              <Link
                to="/profile"
                className="hover:text-red-500 drop-shadow-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/form"
                className="hover:text-red-500 drop-shadow-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Add Movie
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}