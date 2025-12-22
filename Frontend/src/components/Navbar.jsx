import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import { useProfile } from "../context/ProfileContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [query, setQuery] = useState("");

  const { movies } = useMovies();
  const { user } = useProfile();
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const filtered = query.trim()
    ? movies.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsOpen(false);
        setMobileSearch(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeClass = (path) =>
    location.pathname === path
      ? "text-red-500"
      : "hover:text-red-500";

  return (
    <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-[9999]">

      <Link to="/home">
        <img
          src="/images/logo.png"
          alt="CineHaven Logo"
          className="h-14 w-auto drop-shadow-lg cursor-pointer"
        />
      </Link>

      {/* Desktop */}
      <nav className="hidden md:flex items-center space-x-8 mr-12 text-lg">

        <div ref={searchRef} className="relative flex items-center">
          {!searchOpen && (
            <img
              src="/images/search.png"
              alt="Search"
              className="h-6 w-6 cursor-pointer hover:opacity-80"
              onClick={() => setSearchOpen(true)}
            />
          )}

          {searchOpen && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl rounded-xl p-1 flex flex-col">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white outline-none py-1.5 px-3 text-sm"
              />
            </div>
          )}
        </div>

        <Link to="/home" className={activeClass("/home")}>Home</Link>
        <Link to="/list" className={activeClass("/list")}>Movies</Link>
        <Link to="/dashboard" className={activeClass("/dashboard")}>Dashboard</Link>

        {isAdmin && (
          <Link to="/form" className={activeClass("/form")}>
            Add Movie
          </Link>
        )}

        <Link to="/profile" className={activeClass("/profile")}>Profile</Link>
      </nav>

      {/* Mobile */}
      <button className="md:hidden text-white focus:outline-none z-[99999]" onClick={() => setIsOpen(!isOpen)} > <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {isOpen ? ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> ) : ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/> )} </svg> </button>

      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-20 right-4 bg-black border-2 border-red-600 rounded-lg "
        >
          <nav className="flex flex-col space-y-3">

            <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/list" onClick={() => setIsOpen(false)}>Movies</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>

            {isAdmin && (
              <Link to="/form" onClick={() => setIsOpen(false)}>
                Add Movie
              </Link>
            )}

            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
